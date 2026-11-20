import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  demoLogin: (role: UserRole) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edunexus_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('edunexus_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifySession = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data?.data?.user) {
            setUser(res.data.data.user);
            localStorage.setItem('edunexus_user', JSON.stringify(res.data.data.user));
          }
        } catch (err) {
          console.warn('Session verification failed, continuing with cached session');
        }
      }
      setIsLoading(false);
    };
    verifySession();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: receivedToken, user: receivedUser } = res.data.data;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('edunexus_token', receivedToken);
    localStorage.setItem('edunexus_user', JSON.stringify(receivedUser));
  };

  const register = async (data: any) => {
    const res = await api.post('/auth/register', data);
    const { token: receivedToken, user: receivedUser } = res.data.data;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('edunexus_token', receivedToken);
    localStorage.setItem('edunexus_user', JSON.stringify(receivedUser));
  };

  const demoLogin = async (role: UserRole) => {
    const demoCredentials: Record<UserRole, { email: string; pass: string }> = {
      ADMIN: { email: 'admin@edunexus.demo', pass: 'EduNexus@2026' },
      STUDENT: { email: 'student@edunexus.demo', pass: 'EduNexus@2026' },
      FACULTY: { email: 'faculty@edunexus.demo', pass: 'EduNexus@2026' },
      HOD: { email: 'hod@edunexus.demo', pass: 'EduNexus@2026' },
      PLACEMENT_OFFICER: { email: 'placement@edunexus.demo', pass: 'EduNexus@2026' },
      ALUMNI: { email: 'alumni@edunexus.demo', pass: 'EduNexus@2026' },
    };

    const target = demoCredentials[role];
    if (target) {
      await login(target.email, target.pass);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('edunexus_token');
    localStorage.removeItem('edunexus_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, demoLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
