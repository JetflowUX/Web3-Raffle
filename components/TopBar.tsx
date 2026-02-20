"use client";

import { WalletButton } from "./WalletButton";
import { useMockMode } from "../hooks/useMockMode";
import { useRaffles } from "../hooks/useRaffles";
import { Sparkles } from "lucide-react";

export function TopBar() {
  const { useMock, toggleMock } = useMockMode();
  const { data: raffles = [] } = useRaffles();

  const totalActiveRaffles = raffles.filter(r => r.status === "Active").length;
  const totalPrizePool = raffles
    .filter(r => r.status === "Active")
    .reduce((sum, r) => sum + parseFloat(r.prizePool), 0)
    .toFixed(2);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#2f4553] bg-[#1a2c38] px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-text-muted">
            {totalActiveRaffles} Active
          </span>
        </div>
        <div className="text-sm">
          <span className="text-text-muted">Total Pool: </span>
          <span className="font-semibold text-primary">{totalPrizePool} ETH</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleMock}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            useMock
              ? "bg-primary/20 text-primary"
              : "bg-accent text-text-muted hover:text-white"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          {useMock ? "Mock Mode" : "Live Mode"}
        </button>
        
        <WalletButton />
      </div>
    </header>
  );
}
