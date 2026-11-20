import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Building2, Calendar, BookOpen, Briefcase, Users, MapPin } from 'lucide-react';
import { Modal } from '../common/Modal';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchableIndex = [
    { title: 'Information Science & Engineering (ISE)', category: 'Department', link: '/departments/ISE', icon: Building2 },
    { title: 'Computer Science & Engineering (CSE)', category: 'Department', link: '/departments/CSE', icon: Building2 },
    { title: 'Electronics & Communication (ECE)', category: 'Department', link: '/departments/ECE', icon: Building2 },
    { title: 'Central Knowledge Library', category: 'Campus Location', link: '/campus-map', icon: MapPin },
    { title: 'Olympic Sports Arena', category: 'Campus Location', link: '/campus-map', icon: MapPin },
    { title: 'Food Court & Cafeteria', category: 'Campus Location', link: '/campus-map', icon: MapPin },
    { title: 'HackNexus 2026 - 36hr Hackathon', category: 'Event', link: '/events', icon: Calendar },
    { title: 'AI & Generative Models Masterclass', category: 'Event', link: '/events', icon: Calendar },
    { title: 'Google Cloud Software Engineer Drive (44 LPA)', category: 'Placement', link: '/placements', icon: Briefcase },
    { title: 'Microsoft SDE-1 Drive (48 LPA)', category: 'Placement', link: '/placements', icon: Briefcase },
    { title: 'CodeNexus Coding Club', category: 'Club', link: '/clubs', icon: Users },
    { title: 'NexusAI Intelligence Club', category: 'Club', link: '/clubs', icon: Users },
    { title: 'Database System Concepts (Silberschatz)', category: 'Library Book', link: '/library', icon: BookOpen },
    { title: 'Continuous Internal Evaluation (CIE-II) Notice', category: 'Notice', link: '/notices', icon: BookOpen },
  ];

  const results = query.trim() === ''
    ? searchableIndex.slice(0, 6)
    : searchableIndex.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (link: string) => {
    navigate(link);
    onClose();
    setQuery('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students, faculty, departments, jobs, events, books, or campus locations..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1 max-h-80 overflow-y-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            {query.trim() === '' ? 'Popular Suggestions' : `Found ${results.length} matches`}
          </p>
          {results.length === 0 ? (
            <p className="text-xs text-slate-500 p-4 text-center">No results found for "{query}".</p>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.link)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Jump →
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};
