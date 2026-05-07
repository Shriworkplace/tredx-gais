import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'neon';
  className?: string;
}

export const Card = ({ children, className, variant = 'glass', ...props }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'p-6 rounded-2xl relative overflow-hidden transition-all duration-300',
        variant === 'glass' && 'glass-card',
        variant === 'solid' && 'solid-card',
        variant === 'neon' && 'glass-card neon-glow',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-mint text-black hover:bg-opacity-90 shadow-lg shadow-primary-mint/20',
      secondary: 'bg-primary-purple text-white hover:bg-opacity-90 shadow-lg shadow-primary-purple/20',
      outline: 'border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-900 dark:text-white',
      ghost: 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white',
      danger: 'bg-accent-pink text-white hover:bg-opacity-90',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
      icon: 'p-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
