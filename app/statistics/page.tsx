'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { getBooks, getSessions } from '@/lib/storage';
import { Book, ReadingSession } from '@/lib/types';
import { BookOpen, Clock, BarChart3 } from 'lucide-react';

export default function Statistics() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sessions, setSessions] = useState<ReadingSession[]>([]);

  useEffect(() => {
    setBooks(getBooks());
    setSessions(getSessions());
  }, []);

  const totalBooksRead = books.filter((book) => book.status === 'finished').length;
  
  const totalReadingTime = sessions.reduce((acc, session) => acc + session.duration, 0);
  const readingTimeInHours = Math.round((totalReadingTime / 3600) * 10) / 10;

  const genreCounts = books.reduce((acc: Record<string, number>, book) => {
    if (book.status === 'finished') {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
    }
    return acc;
  }, {});

  const mostReadGenre = Object.entries(genreCounts).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['なし', 0]
  )[0];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">読書統計</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8" />
            <div>
              <p className="text-sm text-muted-foreground">完読した本</p>
              <h2 className="text-3xl font-bold">{totalBooksRead}</h2>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Clock className="h-8 w-8" />
            <div>
              <p className="text-sm text-muted-foreground">総読書時間</p>
              <h2 className="text-3xl font-bold">{readingTimeInHours}時間</h2>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <BarChart3 className="h-8 w-8" />
            <div>
              <p className="text-sm text-muted-foreground">最も読んだジャンル</p>
              <h2 className="text-3xl font-bold">{mostReadGenre}</h2>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">読書の進捗</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>読書中</span>
            <span className="font-bold">
              {books.filter((book) => book.status === 'currently-reading').length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>完読</span>
            <span className="font-bold">
              {books.filter((book) => book.status === 'finished').length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>読みたい本</span>
            <span className="font-bold">
              {books.filter((book) => book.status === 'wishlist').length}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}