import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletButton } from './WalletButton';
import { Ticket, Trophy, PlusCircle, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Raffles',
    path: '/',
    icon: Ticket
  },
  {
    name: 'Winners',
    path: '/winners',
    icon: Trophy
  },
  {
    name: 'My Tickets',
    path: '/my-tickets',
    icon: Ticket
  },
  {
    name: 'Create',
    path: '/create',
    icon: PlusCircle
  }];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent',
        scrolled ?
        'bg-[#0B0F1A]/80 backdrop-blur-lg border-gray-800 py-3' :
        'bg-transparent py-5'
      )}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Ticket className="text-white h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ChainRaffle
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    isActive ?
                    'text-white bg-white/5' :
                    'text-gray-400 hover:text-white hover:bg-white/5'
                  )}>

                  <link.icon
                    className={cn(
                      'h-4 w-4',
                      isActive ? 'text-indigo-400' : 'text-gray-500'
                    )} />

                  {link.name}
                </Link>);

            })}
          </nav>

          {/* Wallet & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <WalletButton />
            </div>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-[#111827] border-b border-gray-800 overflow-hidden">

            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center gap-3',
                location.pathname === link.path ?
                'bg-indigo-600/10 text-indigo-400' :
                'text-gray-400 hover:bg-white/5 hover:text-white'
              )}>

                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
            )}
              <div className="pt-4 mt-4 border-t border-gray-800">
                <WalletButton className="w-full justify-center" />
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}