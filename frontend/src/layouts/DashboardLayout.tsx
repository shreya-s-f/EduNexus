import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Briefcase,
  FileText,
  AlertCircle,
  Sparkles,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  User as UserIcon,
  Compass,
  Bus,
  BedDouble,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Badge } from '../components/common/Badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items based on role
  const getNavItems = () => {
    const role = user?.role || 'STUDENT';

    if (role === 'ADMIN') {
      return [
        { label: 'Admin Center', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Department Control', href: '/departments', icon: BookOpen },
        { label: 'Grievance Desk', href: '/complaints', icon: AlertCircle },
        { label: 'Campus Map', href: '/campus-map', icon: Compass },
        { label: 'Notice Board', href: '/notices', icon: FileText },
        { label: 'Campus Transport', href: '/transport', icon: Bus },
        { label: 'Hostel Rooms', href: '/hostel', icon: BedDouble },
        { label: 'AI Campus Desk', href: '/ai-assistant', icon: Sparkles },
      ];
    }

    if (role === 'FACULTY' || role === 'HOD') {
      return [
        { label: 'Faculty Dashboard', href: '/faculty/dashboard', icon: LayoutDashboard },
        { label: 'Mark Attendance', href: '/student/attendance', icon: Award },
        { label: 'Assignments', href: '/assignments', icon: FileText },
        { label: 'Class Timetable', href: '/timetable', icon: Clock },
        { label: 'Notices', href: '/notices', icon: FileText },
        { label: 'Campus AI', href: '/ai-assistant', icon: Sparkles },
      ];
    }

    if (role === 'PLACEMENT_OFFICER') {
      return [
        { label: 'Placement Hub', href: '/placement/dashboard', icon: LayoutDashboard },
        { label: 'Placement Drives', href: '/placements', icon: Briefcase },
        { label: 'Student Applications', href: '/placements', icon: FileText },
        { label: 'Alumni Network', href: '/alumni', icon: GraduationCap },
        { label: 'Campus AI', href: '/ai-assistant', icon: Sparkles },
      ];
    }

    // Default: STUDENT
    return [
      { label: 'Student Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
      { label: 'My Profile & Skills', href: '/student/profile', icon: UserIcon },
      { label: 'Attendance & Predictor', href: '/student/attendance', icon: Award },
      { label: 'Weekly Timetable', href: '/timetable', icon: Clock },
      { label: 'Exams & SGPA Results', href: '/exams', icon: Calendar },
      { label: 'Assignments', href: '/assignments', icon: FileText },
      { label: 'Placement Portal', href: '/placements', icon: Briefcase },
      { label: 'Central Library', href: '/library', icon: BookOpen },
      { label: 'Submit Grievance', href: '/complaints', icon: AlertCircle },
      { label: 'Campus AI Assistant', href: '/ai-assistant', icon: Sparkles },
    ];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Pure White in Light, Pure Black in Dark */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-black border-r border-slate-200/90 dark:border-zinc-800/90 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo with 3D shadow and Red, Blue, Green dots */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-3d-red group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-1">
                  EduNexus
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="block text-[9px] uppercase font-bold tracking-wider text-red-600 dark:text-sky-400">
                  Campus Platform
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-sm flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {user?.name || 'Student Member'}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge variant="primary" size="sm">
                    {user?.role || 'STUDENT'}
                  </Badge>
                  {user?.usn && <span className="text-[10px] text-slate-400 font-mono">{user.usn}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 px-3 tracking-wider">
              Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 dark:bg-zinc-900 dark:text-sky-400 font-bold shadow-2xs border-l-4 border-red-600 dark:border-sky-400'
                      : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200/80 dark:border-zinc-800 space-y-2">
          <Link
            to="/emergency"
            className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold border border-red-200 dark:border-red-900/60"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
              <span>Emergency SOS</span>
            </div>
            <span className="text-[10px] bg-red-200 dark:bg-red-900/80 px-1.5 py-0.5 rounded text-red-900 dark:text-red-200">24/7</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 dark:text-zinc-400">
              Department of {user?.department || 'Information Science & Engineering'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ai-assistant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-zinc-900 border border-sky-300 dark:border-sky-500/40 text-sky-700 dark:text-sky-300 text-xs font-bold hover:shadow-glow-blue transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Ask AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-900"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-zinc-800" />

            <Link to="/" className="text-xs font-semibold text-red-600 dark:text-sky-400 hover:underline">
              Public Portal →
            </Link>
          </div>
        </header>

        {/* Injected Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">{children}</main>
      </div>
    </div>
  );
};
