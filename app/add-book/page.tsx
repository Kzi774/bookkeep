'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
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
import { saveBook } from '@/lib/storage';
import { Book } from '@/lib/types';

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

export default function AddBook() {
  const router = useRouter();
  const { toast } = useToast();
  const [book, setBook] = useState<Partial<Book>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.genre || !book.status) {
      toast({
        title: 'エラー',
        description: '必須項目をすべて入力してください。',
        variant: 'destructive',
      });
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: book.status as Book['status'],
      dateFinished: book.dateFinished,
      notes: book.notes,
    };

    saveBook(newBook);
    toast({
      title: '完了',
      description: '本が追加されました！',
    });
    router.push('/bookshelf');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">新しい本を追加</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">タイトル *</Label>
          <Input
            id="title"
            value={book.title || ''}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">著者 *</Label>
          <Input
            id="author"
            value={book.author || ''}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">ジャンル *</Label>
          <Select
            value={book.genre}
            onValueChange={(value) => setBook({ ...book, genre: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="ジャンルを選択" />
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
          <Label htmlFor="status">読書状況 *</Label>
          <Select
            value={book.status}
            onValueChange={(value) => setBook({ ...book, status: value as Book['status'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="状況を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="currently-reading">読書中</SelectItem>
              <SelectItem value="finished">完読</SelectItem>
              <SelectItem value="wishlist">読みたい本</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {book.status === 'finished' && (
          <div className="space-y-2">
            <Label htmlFor="dateFinished">読了日</Label>
            <Input
              id="dateFinished"
              type="date"
              value={book.dateFinished || ''}
              onChange={(e) => setBook({ ...book, dateFinished: e.target.value })}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">メモ</Label>
          <Textarea
            id="notes"
            value={book.notes || ''}
            onChange={(e) => setBook({ ...book, notes: e.target.value })}
            placeholder="本についての感想や考えを書きましょう..."
          />
        </div>

        <Button type="submit" className="w-full">
          本を追加
        </Button>
      </form>
    </div>
  );
}