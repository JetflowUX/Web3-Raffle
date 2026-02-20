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
    <div className="space-y-8">
      {/* Trending Section */}
      {trendingRaffles.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-white">Trending</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trendingRaffles.map((raffle) => (
              <Link
                key={raffle.id}
                href={`/raffle/${raffle.id}`}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-4 transition-all hover:from-primary/30 hover:to-primary/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-muted">Prize Pool</p>
                    <p className="mt-1 text-2xl font-bold text-white">{raffle.prizePool} ETH</p>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-text-muted">Ticket: {raffle.ticketPrice} ETH</span>
                  <span className="text-text-muted">{raffle.participants} players</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Raffles Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">All Raffles</h2>
          <Button className="bg-primary text-black hover:bg-primary/90" size="sm" asChild>
            <Link href="/create">+ Create Raffle</Link>
          </Button>
        </div>
        <RaffleGrid raffles={allRaffles} isLoading={isLoading} />
      </section>
    </div>
  );
}
