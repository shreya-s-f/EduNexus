import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { BookOpen, Search, MapPin, CheckCircle, Clock } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { LibraryBookItem } from '../types';

export const LibraryPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [books, setBooks] = useState<LibraryBookItem[]>([]);
  const [search, setSearch] = useState('');
  const [issuingBookId, setIssuingBookId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/library/books', { params: { search } });
        setBooks(res.data.data || []);
      } catch (err) {
        console.error('Failed to load books', err);
      }
    };
    fetchBooks();
  }, [search]);

  const handleIssueBook = async (book: LibraryBookItem) => {
    if (!user) {
      addToast('warning', 'Login Required', 'Please log in to your student account to request book issues.');
      return;
    }
    setIssuingBookId(book._id);
    try {
      await api.post('/library/issue', { bookId: book._id });
      addToast('success', 'Book Issued', `Successfully issued "${book.title}". Due date is in 15 days.`);
      setBooks((prev) =>
        prev.map((b) => (b._id === book._id ? { ...b, availableCopies: b.availableCopies - 1 } : b))
      );
    } catch (err: any) {
      addToast('error', 'Issue Failed', err.response?.data?.message || 'Could not issue book.');
    } finally {
      setIssuingBookId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary">Digital Library & Knowledge Center</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Central University Library Catalog
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Browse textbooks, monographs, international journal publications, and reserve physical copies online.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-soft"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <Card key={b._id} hover className="p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="neutral" size="sm">{b.category}</Badge>
                <span className={`text-xs font-bold ${b.availableCopies > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {b.availableCopies} Copies Available
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{b.author}</p>
              </div>

              <div className="space-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{b.rackLocation}</span>
                </div>
                <p className="text-[11px] text-slate-400">ISBN: {b.isbn}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                onClick={() => handleIssueBook(b)}
                isLoading={issuingBookId === b._id}
                disabled={b.availableCopies <= 0}
                className="w-full"
                size="sm"
              >
                {b.availableCopies > 0 ? 'Issue to Student Pass' : 'Currently Checked Out'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
