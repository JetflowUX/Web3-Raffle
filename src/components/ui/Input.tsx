import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, rightElement, ...props }, ref) => {
    return (
      <div className="w-full">
        {label &&
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
            {label}
          </label>
        }
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'w-full bg-[#0B0F1A] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200',
              error &&
              'border-red-500 focus:ring-red-500/50 focus:border-red-500',
              rightElement && 'pr-12',
              className
            )}
            {...props} />

          {rightElement &&
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightElement}
            </div>
          }
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>);

  }
);
Input.displayName = 'Input';