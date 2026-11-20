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
  MapPin,
  LogIn,
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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                EduNexus
                <span className="w-2 h-2 rounded-full bg-brand-500" />
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
                Your Campus, Connected.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
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
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Assistant shortcut */}
            <Link
              to="/ai-assistant"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Campus AI</span>
            </Link>

            {/* Emergency shortcut */}
            <Link
              to="/emergency"
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              title="Emergency SOS"
            >
              <ShieldAlert className="w-5 h-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 p-2"
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
        <div className="lg:hidden p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/ai-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50"
          >
            <Sparkles className="w-4 h-4" />
            <span>EduNexus AI Assistant</span>
          </Link>
          <Link
            to="/emergency"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Campus Emergency SOS</span>
          </Link>
        </div>
      )}
    </header>
  );
};
