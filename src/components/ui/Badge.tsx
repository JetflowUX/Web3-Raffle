import React from 'react';
import { cn } from '../../lib/utils';
import { RaffleStatus } from '../../lib/types';
interface BadgeProps {
  status: RaffleStatus | 'success' | 'warning' | 'error';
  className?: string;
}
export function Badge({ status, className }: BadgeProps) {
  const styles = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    drawing: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    completed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20'
  };
  const labels = {
    active: 'Active',
    success: 'Success',
    drawing: 'Drawing',
    completed: 'Ended',
    warning: 'Warning',
    error: 'Error'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        styles[status],
        className
      )}>

      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          status === 'active' || status === 'success' ?
          'bg-green-400 animate-pulse' :
          status === 'drawing' ?
          'bg-indigo-400 animate-pulse' :
          status === 'warning' ?
          'bg-yellow-400' :
          status === 'error' ?
          'bg-red-400' :
          'bg-gray-400'
        )} />

      {labels[status]}
    </span>);

}