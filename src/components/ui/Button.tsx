import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  },
  ref) =>
  {
    const variants = {
      primary:
      'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-indigo-500/50',
      secondary:
      'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-purple-500/50',
      outline:
      'bg-transparent border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-800/50',
      ghost:
      'bg-transparent text-gray-400 hover:text-white hover:bg-gray-800/50',
      danger:
      'bg-red-600/10 text-red-500 border border-red-900/50 hover:bg-red-600/20 hover:border-red-500/50'
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg font-semibold'
    };
    return (
      <motion.button
        ref={ref}
        whileTap={{
          scale: 0.98
        }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F1A] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}>

        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>);

  }
);
Button.displayName = 'Button';