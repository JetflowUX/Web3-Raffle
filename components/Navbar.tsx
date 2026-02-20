"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -12, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20"
          >
            <Zap className="h-5 w-5 text-primary" />
          </motion.div>
          <div>
            <p className="font-display text-lg font-semibold text-text">ChainRaffle</p>
            <p className="text-xs text-muted">Premium Web3 draws</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant={useMock ? "secondary" : "outline"}
            size="sm"
            onClick={toggleMock}
          >
            {useMock ? "Mock On" : "Mock Off"}
          </Button>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
