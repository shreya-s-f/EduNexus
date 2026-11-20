import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card3D } from '../components/3d/Card3D';
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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-3d-red group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
              EduNexus
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Sign in to your Portal</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Access academics, attendance, timetable, results & placements</p>
        </div>

        {/* Demo Accounts Bar */}
        <Card3D glowColor="blue" intensity={8}>
          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-zinc-950 border border-sky-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-sky-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
                <span>One-Click Demo Portals</span>
              </span>
              <Badge variant="primary" size="sm">Password: EduNexus@2026</Badge>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-zinc-400">
              Click any role to test instant dashboard access without typing credentials:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleDemoClick('STUDENT')}
                className="p-2 rounded-xl bg-white dark:bg-black border border-red-300 dark:border-red-900/60 text-[11px] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shadow-2xs"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('FACULTY')}
                className="p-2 rounded-xl bg-white dark:bg-black border border-sky-300 dark:border-sky-900/60 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors shadow-2xs"
              >
                👨‍🏫 Faculty
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('HOD')}
                className="p-2 rounded-xl bg-white dark:bg-black border border-emerald-300 dark:border-emerald-900/60 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors shadow-2xs"
              >
                🏛️ HOD
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('ADMIN')}
                className="p-2 rounded-xl bg-white dark:bg-black border border-red-300 dark:border-red-900/60 text-[11px] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shadow-2xs"
              >
                ⚡ Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('PLACEMENT_OFFICER')}
                className="p-2 rounded-xl bg-white dark:bg-black border border-sky-300 dark:border-sky-900/60 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors shadow-2xs"
              >
                💼 Placement
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('ALUMNI')}
                className="p-2 rounded-xl bg-white dark:bg-black border border-emerald-300 dark:border-emerald-900/60 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors shadow-2xs"
              >
                🌟 Alumni
              </button>
            </div>
          </div>
        </Card3D>

        {/* Main Form with 3D Tilt */}
        <Card3D glowColor="red" intensity={10}>
          <div className="p-6 sm:p-8 space-y-4 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-zinc-800">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
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
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('info', 'Reset Password', 'Please contact admin@edunexus.demo or IT Support to reset password.');
                    }}
                    className="text-xs text-red-600 dark:text-sky-400 hover:underline"
                  >
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
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300"
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
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 dark:text-zinc-400">
                  Keep me signed in on this device
                </label>
              </div>

              <Button type="submit" variant="primary" isLoading={isLoading} className="w-full shadow-3d-red">
                Sign In to EduNexus
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-red-600 dark:text-sky-400 hover:underline">
                Create an account
              </Link>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
};
