import { Card } from '@/components/ui/card';
import { BookOpen, Clock, BarChart3, Library } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">BookKeepへようこそ</h1>
        <p className="text-lg text-muted-foreground">
          読書の記録を管理し、より良い読書習慣を築きましょう。
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/add-book">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <BookOpen className="h-12 w-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">本を追加</h2>
            <p className="text-muted-foreground">読書の進捗と感想を記録します。</p>
          </Card>
        </Link>
        
        <Link href="/bookshelf">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Library className="h-12 w-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">本棚</h2>
            <p className="text-muted-foreground">蔵書を整理・管理します。</p>
          </Card>
        </Link>
        
        <Link href="/timer">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Clock className="h-12 w-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">読書タイマー</h2>
            <p className="text-muted-foreground">読書時間を記録します。</p>
          </Card>
        </Link>
        
        <Link href="/statistics">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <BarChart3 className="h-12 w-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">統計</h2>
            <p className="text-muted-foreground">読書の分析を確認します。</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}