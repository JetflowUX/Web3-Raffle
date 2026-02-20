"use client";

import { Hero } from "../components/Hero";
import { RaffleGrid } from "../components/RaffleGrid";
import { useRaffles } from "../hooks/useRaffles";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const { data: raffles, isLoading } = useRaffles();

  return (
    <div className="bg-background">
      <Hero />
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Active raffles</p>
            <h2 className="font-display text-2xl font-semibold text-text">Enter the latest drops</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/create">Launch a raffle</Link>
          </Button>
        </div>
        <div className="mt-8">
          <RaffleGrid raffles={raffles} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}
