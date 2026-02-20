"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-orbit">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-muted"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            Transparent, on-chain raffle draws
          </motion.div>
          <h1 className="font-display text-4xl font-semibold text-text md:text-5xl">
            Win premium prizes with <span className="text-gradient">ChainRaffle</span>
          </h1>
          <p className="max-w-xl text-sm text-muted md:text-base">
            Connect your wallet, enter raffles with a few clicks, and track winners in real time.
            Built for speed, transparency, and trust.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/create">
                Create a raffle <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/winners">View winners</Link>
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-card">
            <div className="space-y-4">
              <p className="text-sm text-muted">Live Pool</p>
              <p className="text-3xl font-semibold text-text">42.9 ETH</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <p className="text-xs text-muted">Active raffles</p>
                  <p className="text-xl font-semibold text-text">12</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <p className="text-xs text-muted">Tickets sold</p>
                  <p className="text-xl font-semibold text-text">1,284</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
