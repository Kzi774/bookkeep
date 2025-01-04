import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookKeep</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/add-book">本を追加</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/bookshelf">本棚</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/timer">読書タイマー</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/statistics">統計</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}