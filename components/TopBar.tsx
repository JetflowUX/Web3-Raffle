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
    <header className="sticky top-0 z-30 border-b border-border bg-secondary/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white font-medium">{totalActiveRaffles}</span>
            <span className="text-muted">Active Raffles</span>
          </div>
          <div className="text-sm">
            <span className="text-muted">Total Pool: </span>
            <span className="font-semibold text-primary">{totalPrizePool} ETH</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMock}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              useMock
                ? "bg-accent text-white border border-border"
                : "text-muted hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {useMock ? "Mock" : "Live"}
          </button>
          
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
