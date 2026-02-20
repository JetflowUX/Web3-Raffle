"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { WalletButton } from "./WalletButton";
import { useMockMode } from "../hooks/useMockMode";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/my-tickets", label: "My Tickets" },
  { href: "/winners", label: "Winners" }
];

export function Navbar() {
  const { useMock, toggleMock } = useMockMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <motion.div
            initial={{ rotate: -12, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/20"
          >
            <Zap className="h-5 w-5 text-primary" />
          </motion.div>
          <div className="hidden sm:block">
            <p className="font-display text-base md:text-lg font-semibold text-text">ChainRaffle</p>
            <p className="text-xs text-muted">Premium Web3 draws</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant={useMock ? "secondary" : "outline"}
            size="sm"
            onClick={toggleMock}
          >
            {useMock ? "Mock On" : "Mock Off"}
          </Button>
          <WalletButton />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted transition hover:text-text"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-background/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-primary/10 hover:text-text active:bg-primary/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="border-t border-border my-2 pt-3">
              <div className="mb-2 flex gap-2">
                <Button
                  variant={useMock ? "secondary" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    toggleMock();
                    setMobileMenuOpen(false);
                  }}
                >
                  {useMock ? "Mock On" : "Mock Off"}
                </Button>
              </div>
              <WalletButton isMobile />
            </div>
          </div>
        </motion.div>
      )}}
    </header>
  );
}
