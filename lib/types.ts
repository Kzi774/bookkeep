export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: 'currently-reading' | 'finished' | 'wishlist';
  dateFinished?: string;
  notes?: string;
};

export type ReadingSession = {
  date: string;
  duration: number;
};