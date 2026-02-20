import React from 'react';
import { Loader2 } from 'lucide-react';
export function Loader({ className }: {className?: string;}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
    </div>);

}
export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-indigo-500 mb-4" />
      <p className="text-gray-400 animate-pulse">Loading ChainRaffle...</p>
    </div>);

}