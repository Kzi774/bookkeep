import { Book, ReadingSession } from './types';

const BOOKS_KEY = 'bookkeep-books';
const SESSIONS_KEY = 'bookkeep-sessions';

export function getBooks(): Book[] {
  if (typeof window === 'undefined') return [];
  const books = localStorage.getItem(BOOKS_KEY);
  return books ? JSON.parse(books) : [];
}

export function saveBook(book: Book) {
  const books = getBooks();
  const newBooks = [...books, book];
  localStorage.setItem(BOOKS_KEY, JSON.stringify(newBooks));
}

export function updateBook(updatedBook: Book) {
  const books = getBooks();
  const newBooks = books.map((book) => 
    book.id === updatedBook.id ? updatedBook : book
  );
  localStorage.setItem(BOOKS_KEY, JSON.stringify(newBooks));
}

export function deleteBook(id: string) {
  const books = getBooks();
  const newBooks = books.filter((book) => book.id !== id);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(newBooks));
}

export function getSessions(): ReadingSession[] {
  if (typeof window === 'undefined') return [];
  const sessions = localStorage.getItem(SESSIONS_KEY);
  return sessions ? JSON.parse(sessions) : [];
}

export function saveSession(duration: number) {
  const sessions = getSessions();
  const newSession: ReadingSession = {
    date: new Date().toISOString(),
    duration,
  };
  const newSessions = [...sessions, newSession];
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
}