"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WinnerCard } from "../../components/WinnerCard";
import { useWinners } from "../../hooks/useWinners";

export default function WinnersPage() {
  const { data: winners, isLoading } = useWinners();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted transition hover:text-text mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to raffles
      </Link>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Winners</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Recent payouts</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:gap-6 xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-48 rounded-2xl bg-card/60" />
            ))
          : winners && winners.length > 0
          ? winners.map((winner) => <WinnerCard key={winner.id} winner={winner} />)
          : (
              <div className="col-span-full text-center py-12">
                <p className="text-sm text-muted">No winners yet. Check back later!</p>
              </div>
            )}
      </div>
    </div>
  );
}
