"use client";

import { WalletButton } from "./WalletButton";
import { useMockMode } from "../hooks/useMockMode";
import { useRaffles } from "../hooks/useRaffles";
import { Sparkles, Zap } from "lucide-react";

export function TopBar() {
  const { useMock, toggleMock } = useMockMode();
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
          <button
            onClick={toggleMock}
            className={`hidden sm:flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              useMock
                ? "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/10"
                : "text-muted hover:text-white hover:bg-accent border border-transparent"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:inline">{useMock ? "Mock" : "Live"}</span>
          </button>
          
          <div className="h-8 w-px bg-border hidden sm:block" />
          
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
