import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, demoLogin } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectRolePath = (role: string) => {
    switch (role) {
      case 'ADMIN': return '/admin/dashboard';
      case 'FACULTY': return '/faculty/dashboard';
      case 'HOD': return '/hod/dashboard';
      case 'PLACEMENT_OFFICER': return '/placement/dashboard';
      case 'ALUMNI': return '/alumni/dashboard';
      default: return '/student/dashboard';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      await login(email, password);
      addToast('success', 'Welcome Back', 'Logged in to EduNexus successfully!');
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from === '/dashboard' || from === '/login' ? '/student/dashboard' : from);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please verify your email and password.';
      setErrorMessage(msg);
      addToast('error', 'Authentication Failed', msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = async (role: UserRole) => {
    setIsLoading(true);
    try {
      await demoLogin(role);
      addToast('success', 'Demo Login', `Signed in as demo ${role}`);
      navigate(redirectRolePath(role));
    } catch (err: any) {
      addToast('error', 'Demo Login Error', 'Could not authenticate demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">EduNexus</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Sign in to your Portal</h2>
          <p className="text-xs text-slate-500">Access academics, attendance, timetable, results & placements</p>
        </div>

        {/* Demo Accounts Bar */}
        <div className="p-4 rounded-2xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-900 dark:text-brand-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>One-Click Demo Portals</span>
            </span>
            <Badge variant="primary" size="sm">Password: EduNexus@2026</Badge>
          </div>
          <p className="text-[11px] text-brand-700/80 dark:text-brand-300">
            Click any role to test instant dashboard access without typing credentials:
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoClick('STUDENT')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 transition-colors"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('FACULTY')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 transition-colors"
            >
              👨‍🏫 Faculty
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('HOD')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 transition-colors"
            >
              🏛️ HOD
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('ADMIN')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 transition-colors"
            >
              ⚡ Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('PLACEMENT_OFFICER')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 transition-colors"
            >
              💼 Placement
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('ALUMNI')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 text-[11px] font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 transition-colors"
            >
              🌟 Alumni
            </button>
          </div>
        </div>

        {/* Main Form */}
        <Card className="p-6 sm:p-8 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-xs text-rose-700 dark:text-rose-300">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@edunexus.demo"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('info', 'Reset Password', 'Please contact admin@edunexus.demo or IT Support to reset password.'); }} className="text-xs text-brand-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 dark:text-slate-400">
                Keep me signed in on this device
              </label>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign In to EduNexus
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
