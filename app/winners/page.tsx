"use client";

import { WinnerCard } from "../../components/WinnerCard";
import { useWinners } from "../../hooks/useWinners";

export default function WinnersPage() {
  const { data: winners, isLoading } = useWinners();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Winners</p>
        <h1 className="font-display text-3xl font-semibold text-text">Recent payouts</h1>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-48 rounded-2xl bg-card/60" />
            ))
          : winners?.map((winner) => <WinnerCard key={winner.id} winner={winner} />)}
      </div>
    </div>
  );
}
