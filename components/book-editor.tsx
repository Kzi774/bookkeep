'use client';

import { useState } from 'react';
import { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateBook } from '@/lib/storage';

const genres = [
  'フィクション',
  'ノンフィクション',
  'ミステリー',
  'SF',
  'ファンタジー',
  'ロマンス',
  '伝記',
  '歴史',
  '自己啓発',
  'その他'
];

interface BookEditorProps {
  book: Book;
  onSave: () => void;
}

export function BookEditor({ book, onSave }: BookEditorProps) {
  const [editedBook, setEditedBook] = useState<Book>(book);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBook(editedBook);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={editedBook.title}
          onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">著者</Label>
        <Input
          id="author"
          value={editedBook.author}
          onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre">ジャンル</Label>
        <Select
          value={editedBook.genre}
          onValueChange={(value) => setEditedBook({ ...editedBook, genre: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">読書状況</Label>
        <Select
          value={editedBook.status}
          onValueChange={(value) => setEditedBook({ ...editedBook, status: value as Book['status'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="currently-reading">読書中</SelectItem>
            <SelectItem value="finished">完読</SelectItem>
            <SelectItem value="wishlist">読みたい本</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {editedBook.status === 'finished' && (
        <div className="space-y-2">
          <Label htmlFor="dateFinished">読了日</Label>
          <Input
            id="dateFinished"
            type="date"
            value={editedBook.dateFinished || ''}
            onChange={(e) => setEditedBook({ ...editedBook, dateFinished: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">メモ</Label>
        <Textarea
          id="notes"
          value={editedBook.notes || ''}
          onChange={(e) => setEditedBook({ ...editedBook, notes: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full">変更を保存</Button>
    </form>
  );
}