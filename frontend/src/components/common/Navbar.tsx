import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  User as UserIcon,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';
import { Badge } from './Badge';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Departments', href: '/departments' },
    { label: 'Placements', href: '/placements' },
    { label: 'Events', href: '/events' },
    { label: 'Clubs', href: '/clubs' },
    { label: 'Campus Map', href: '/campus-map' },
  ];

  const getDashboardPath = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return '/admin/dashboard';
      case 'FACULTY':
        return '/faculty/dashboard';
      case 'HOD':
        return '/hod/dashboard';
      case 'PLACEMENT_OFFICER':
        return '/placement/dashboard';
      case 'ALUMNI':
        return '/alumni/dashboard';
      default:
        return '/student/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-zinc-800 transition-colors">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with 3D depth and Red, Light Blue, Light Green accents */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-3d-red group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                EduNexus
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-glow-blue animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-glow-green" />
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-red-600 dark:text-sky-400">
                Your Campus, Connected.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-black/90 p-1.5 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-sky-400 shadow-sm border border-slate-200/60 dark:border-zinc-700/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Global Campus Search"
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Assistant shortcut - Light Blue & Light Green styling */}
            <Link
              to="/ai-assistant"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-black border border-sky-300 dark:border-sky-500/40 text-sky-700 dark:text-sky-300 text-xs font-bold transition-all hover:scale-105 shadow-2xs hover:shadow-glow-blue"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
              <span>Campus AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </Link>

            {/* Emergency shortcut - Red styling */}
            <Link
              to="/emergency"
              className="p-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Campus Emergency SOS"
            >
              <ShieldAlert className="w-5 h-5 animate-pulse text-red-600 dark:text-red-400" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth / Profile CTA */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link to={getDashboardPath(user.role)}>
                  <Button size="sm" className="gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                    <Badge variant="neutral" size="sm" className="ml-1 bg-white/20 text-white border-transparent">
                      {user.role}
                    </Badge>
                  </Button>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-semibold text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-2 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 border-t border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/ai-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-zinc-900"
          >
            <Sparkles className="w-4 h-4" />
            <span>EduNexus AI Assistant</span>
          </Link>
          <Link
            to="/emergency"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Campus Emergency SOS</span>
          </Link>
        </div>
      )}
    </header>
  );
};
