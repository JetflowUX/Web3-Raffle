"use client";

import { useState } from "react";
import { RaffleGrid } from "../components/RaffleGrid";
import { useRaffles } from "../hooks/useRaffles";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { TrendingUp, Sparkles } from "lucide-react";
import { allBlockchains, getBlockchainConfig } from "../lib/blockchainConfig";
import type { Blockchain } from "../lib/types";

export default function HomePage() {
  const { data: raffles, isLoading } = useRaffles();
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain | "All">("All");
  
  const trendingRaffles = raffles?.slice(0, 3) || [];
  
  const filteredRaffles = selectedBlockchain === "All" 
    ? raffles || [] 
    : raffles?.filter(r => r.blockchain === selectedBlockchain) || [];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-emerald-500/10 to-transparent border border-primary/30 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2 gradient-text">Welcome to ChainRaffle</h1>
          <p className="text-lg text-muted">Enter raffles, win big prizes on the blockchain</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Trending Section - Always render to prevent hydration mismatch */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Trending Raffles</h2>
            <p className="text-sm text-muted">Most popular draws right now</p>
          </div>
        </div>
        {isLoading || trendingRaffles.length === 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-6 h-40 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-20 mb-3" />
                <div className="h-8 bg-white/10 rounded w-32 mb-4" />
                <div className="h-3 bg-white/10 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {trendingRaffles.map((raffle, index) => {
              const config = getBlockchainConfig(raffle.blockchain);
              return (
                <Link
                  key={raffle.id}
                  href={`/raffle/${raffle.id}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine" />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-xs font-semibold text-muted uppercase tracking-wider">Prize Pool</p>
                        <p className="mt-2 text-3xl font-bold text-white">{raffle.prizePool} <span className="text-xl text-muted">{config.currency}</span></p>
                      </div>
                      <div className="rounded-full bg-primary/20 p-2.5 group-hover:bg-primary/30 transition-colors">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                      <span className="text-muted font-medium">{raffle.ticketPrice} {config.currency}/ticket</span>
                      <span className="text-white font-semibold">{raffle.participants} players</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* All Raffles Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">All Raffles</h2>
            <p className="text-sm text-muted mt-1">Browse all available draws</p>
          </div>
          <Button className="bg-primary text-black hover:bg-primary/90 font-semibold shadow-lg hover:shadow-primary/20 transition-all" size="sm" asChild>
            <Link href="/create">+ Create Raffle</Link>
          </Button>
        </div>

        {/* Blockchain Filter Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedBlockchain("All")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              selectedBlockchain === "All"
                ? "bg-primary text-black shadow-lg"
                : "bg-card border border-border text-muted hover:text-white hover:border-primary/30"
            }`}
          >
            All Chains
          </button>
          {allBlockchains.map((blockchain) => {
            const config = getBlockchainConfig(blockchain);
            const Icon = config.icon;
            const isSelected = selectedBlockchain === blockchain;
            
            return (
              <button
                key={blockchain}
                onClick={() => setSelectedBlockchain(blockchain)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? `${config.bgColor} ${config.borderColor} border text-white shadow-lg`
                    : "bg-card border border-border text-muted hover:text-white hover:border-primary/30"
                }`}
              >
                <Icon className="h-4 w-4" />
                {blockchain}
              </button>
            );
          })}
        </div>

        <RaffleGrid raffles={filteredRaffles} isLoading={isLoading} />
      </section>
    </div>
  );
}
