import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  borderGlow?: 'red' | 'blue' | 'green' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  borderGlow = 'none',
  ...props
}) => {
  const glowStyles = {
    red: 'border-red-300 dark:border-red-900/60 shadow-3d-red/20',
    blue: 'border-sky-300 dark:border-sky-900/60 shadow-3d-blue/20',
    green: 'border-emerald-300 dark:border-emerald-900/60 shadow-3d-green/20',
    none: 'border-slate-200/90 dark:border-zinc-800/80',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'glass-panel'
          : 'bg-white dark:bg-black shadow-soft',
        glowStyles[borderGlow],
        hover &&
          'hover:-translate-y-1.5 hover:shadow-card hover:border-red-400 dark:hover:border-sky-400',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
