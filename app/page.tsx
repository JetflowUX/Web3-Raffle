"use client";

import { RaffleGrid } from "../components/RaffleGrid";
import { useRaffles } from "../hooks/useRaffles";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { TrendingUp, Sparkles } from "lucide-react";

export default function HomePage() {
  const { data: raffles, isLoading } = useRaffles();
  const trendingRaffles = raffles?.slice(0, 3) || [];
  const allRaffles = raffles || [];

  return (
    <div className="space-y-10">
      {/* Trending Section - Always render to prevent hydration mismatch */}
      <section>
        <div className="mb-5 flex items-center gap-2.5">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-white">Trending Raffles</h2>
        </div>
        {isLoading || trendingRaffles.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-5 h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {trendingRaffles.map((raffle) => (
              <Link
                key={raffle.id}
                href={`/raffle/${raffle.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wide">Prize Pool</p>
                    <p className="mt-1.5 text-2xl font-bold text-white">{raffle.prizePool} <span className="text-lg">ETH</span></p>
                  </div>
                  <div className="rounded-full bg-primary/20 p-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                  <span className="text-muted">{raffle.ticketPrice} ETH/ticket</span>
                  <span className="text-white font-medium">{raffle.participants} players</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* All Raffles Section */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">All Raffles</h2>
          <Button className="bg-primary text-black hover:bg-primary/90 font-semibold" size="sm" asChild>
            <Link href="/create">+ Create Raffle</Link>
          </Button>
        </div>
        <RaffleGrid raffles={allRaffles} isLoading={isLoading} />
      </section>
    </div>
  );
}
