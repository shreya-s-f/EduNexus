import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'lightblue' | 'lightgreen';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-y-0.5';

  const variants = {
    // Primary: Vibrant University Red with 3D elevation
    primary:
      'bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-700 hover:to-rose-700 text-white shadow-3d-red hover:shadow-glow-red focus:ring-red-500 border border-red-500/30',
    // Secondary: Crisp White in Light, Pure Black in Dark
    secondary:
      'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm dark:bg-black dark:hover:bg-zinc-950 dark:text-white dark:border-zinc-800 hover:border-c-blue-400 dark:hover:border-c-blue-400 focus:ring-sky-400',
    // Light Blue: Sky / Cyan 3D button
    lightblue:
      'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-3d-blue hover:shadow-glow-blue focus:ring-sky-400 border border-sky-400/30',
    // Light Green: Mint / Emerald 3D button
    lightgreen:
      'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-3d-green hover:shadow-glow-green focus:ring-emerald-400 border border-emerald-400/30',
    // Outline: Minimal border with hover tint
    outline:
      'border-2 border-slate-300 hover:border-red-500 hover:bg-red-50/50 text-slate-800 dark:border-zinc-700 dark:hover:border-sky-400 dark:hover:bg-zinc-900 dark:text-white focus:ring-red-500',
    // Ghost
    ghost:
      'hover:bg-slate-100 text-slate-700 dark:hover:bg-zinc-900 dark:text-slate-200 focus:ring-slate-400',
    // Danger
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 focus:ring-red-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
