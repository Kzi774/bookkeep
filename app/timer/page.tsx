'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { saveSession } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(600); // 10分（秒）
  const [isRunning, setIsRunning] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !sessionComplete) {
      setSessionComplete(true);
      setIsRunning(false);
      saveSession(600);
      toast({
        title: 'セッション完了！',
        description: 'お疲れ様でした！読書セッションが完了しました。',
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionComplete, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setTimeLeft(600);
    setIsRunning(false);
    setSessionComplete(false);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">読書タイマー</h1>
      
      <Card className="p-8 mb-8">
        <div className="text-6xl font-mono mb-8">{formatTime(timeLeft)}</div>
        
        <div className="space-x-4">
          {!isRunning && !sessionComplete && (
            <Button onClick={handleStart}>開始</Button>
          )}
          {isRunning && (
            <Button onClick={handlePause} variant="secondary">一時停止</Button>
          )}
          <Button onClick={handleReset} variant="outline">リセット</Button>
        </div>
      </Card>

      {sessionComplete && (
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-lg font-semibold">セッション完了！ 🎉</p>
          <p className="text-sm text-muted-foreground mt-2">
            読書セッションが完了しました。次のセッションの前に少し休憩を取りましょう。
          </p>
        </div>
      )}
    </div>
  );
}