import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Search, Pin, Calendar, User, Sparkles } from 'lucide-react';
import api from '../services/api';
import { NoticeItem } from '../types';

export const NoticeBoardPage: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');

  const categories = ['ALL', 'Examination', 'Placement', 'Academic', 'Events', 'General'];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices', {
          params: {
            category: selectedCategory !== 'ALL' ? selectedCategory : undefined,
            search: search || undefined,
          },
        });
        setNotices(res.data.data || []);
      } catch (err) {
        console.error('Failed to load notices', err);
      }
    };
    fetchNotices();
  }, [selectedCategory, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Digital Campus Notice Board
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Official institutional circulars, exam notifications, placement notices, and schedules.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search circulars..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((n) => (
          <Card key={n._id} className="p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {n.isPinned && (
                  <span className="p-1 rounded bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <Badge variant={n.priority === 'High' ? 'danger' : 'primary'} size="sm">
                  {n.category}
                </Badge>
                <span className="text-[11px] text-slate-400">Date: {n.date}</span>
              </div>
              <span className={`text-[11px] font-bold ${n.priority === 'High' ? 'text-rose-600' : 'text-slate-500'}`}>
                Priority: {n.priority}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{n.title}</h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{n.content}</p>

            {n.summary && (
              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/50 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>AI Brief:</strong> {n.summary}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Published by: {n.publishedBy}</span>
              <span>Target: {n.department}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
