import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverEffect = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={
        hoverEffect ?
        {
          y: 0
        } :
        undefined
        }
        whileHover={
        hoverEffect ?
        {
          y: -5,
          transition: {
            duration: 0.2
          }
        } :
        undefined
        }
        className={cn(
          'bg-[#111827]/80 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden',
          hoverEffect &&
          'hover:border-indigo-500/50 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] transition-colors duration-300',
          className
        )}
        {...props}>

        {children}
      </motion.div>);

  }
);
Card.displayName = 'Card';