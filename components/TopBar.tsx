"use client";

import { WalletButton } from "./WalletButton";
import { useRaffles } from "../hooks/useRaffles";

export function TopBar() {
  const { data: raffles = [] } = useRaffles();

  const totalActiveRaffles = raffles.filter(r => r.status === "Active").length;
  const totalPrizePool = raffles
    .filter(r => r.status === "Active")
    .reduce((sum, r) => sum + parseFloat(r.prizePool), 0)
    .toFixed(2);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-secondary/95 backdrop-blur-xl shadow-lg">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
        <div className="hidden sm:flex items-center gap-4 md:gap-10">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <div className="relative">
              <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-primary animate-ping opacity-75" />
            </div>
            <span className="text-white font-semibold">{totalActiveRaffles}</span>
            <span className="text-muted">Active Raffles</span>
          </div>
          <div className="h-6 w-px bg-border hidden md:block" />
          <div className="hidden md:block text-sm">
            <span className="text-muted">Total Pool: </span>
            <span className="font-bold text-primary">{totalPrizePool} ETH</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="h-8 w-px bg-border hidden sm:block" />
          
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
