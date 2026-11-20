import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'glass-panel'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-soft',
        hover &&
          'hover:-translate-y-1 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
