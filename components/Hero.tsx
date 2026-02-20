"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-orbit border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              <Sparkles className="h-3 w-3" />
              Transparent On-Chain Raffles
            </div>
            <h1 className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl">
              Win Premium Prizes with{" "}
              <span className="text-gradient">ChainRaffle</span>
            </h1>
            <p className="max-w-2xl text-sm text-muted md:text-base">
              Connect your wallet, enter raffles, and track winners in real-time. Powered by blockchain technology.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link href="/create">
                Create Raffle <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/winners">View Winners</Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          >
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs text-muted uppercase tracking-wider">Total Pool</p>
              <p className="text-xl font-bold text-text md:text-2xl">42.9 ETH</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs text-muted uppercase tracking-wider">Active</p>
              <p className="text-xl font-bold text-text md:text-2xl">12</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs text-muted uppercase tracking-wider">Tickets</p>
              <p className="text-xl font-bold text-text md:text-2xl">1,284</p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs text-muted uppercase tracking-wider">Winners</p>
              <p className="text-xl font-bold text-accent md:text-2xl">89</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
