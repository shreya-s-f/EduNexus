import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { GlobalSearchModal } from '../components/search/GlobalSearchModal';
import { Sparkles } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Floating 3D Campus AI Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          to="/ai-assistant"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-sky-500 hover:from-red-700 hover:to-sky-600 text-white font-bold text-xs shadow-3d-red hover:shadow-glow-red transition-all transform hover:scale-105 active:scale-95 border border-white/20"
        >
          <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          </div>
          <span>Ask EduNexus AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </Link>
      </div>
    </div>
  );
};
