'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Book } from '@/lib/types';
import { getBooks, updateBook, deleteBook } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BookEditor } from '@/components/book-editor';

export default function Bookshelf() {
  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;
    
    if (sourceStatus === destinationStatus) return;

    const bookId = result.draggableId;
    const book = books.find((b) => b.id === bookId);
    
    if (!book) return;

    const updatedBook = {
      ...book,
      status: destinationStatus as Book['status'],
      dateFinished: destinationStatus === 'finished' ? new Date().toISOString().split('T')[0] : undefined,
    };

    updateBook(updatedBook);
    setBooks(getBooks());

    toast({
      title: '更新完了',
      description: `「${book.title}」を${destinationStatus === 'currently-reading' ? '読書中' : destinationStatus === 'finished' ? '完読' : '読みたい本'}に移動しました`,
    });
  };

  const handleDelete = (id: string) => {
    deleteBook(id);
    setBooks(getBooks());
    toast({
      title: '削除完了',
      description: '本を本棚から削除しました。',
    });
  };

  const handleUpdate = () => {
    setBooks(getBooks());
    toast({
      title: '更新完了',
      description: '本の情報を更新しました。',
    });
  };

  const sections = [
    { id: 'currently-reading', title: '読書中' },
    { id: 'finished', title: '完読' },
    { id: 'wishlist', title: '読みたい本' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">私の本棚</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <Droppable droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 min-h-[200px]"
                  >
                    {books
                      .filter((book) => book.status === section.id)
                      .map((book, index) => (
                        <Draggable
                          key={book.id}
                          draggableId={book.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">{book.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    著者：{book.author}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {book.genre}
                                  </p>
                                </div>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>本を編集</DialogTitle>
                                      </DialogHeader>
                                      <BookEditor
                                        book={book}
                                        onSave={handleUpdate}
                                      />
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDelete(book.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}