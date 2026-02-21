import { Ticket } from "lucide-react";
import type { Raffle } from "../lib/types";
import { RaffleCard } from "./RaffleCard";
import { Skeleton } from "./ui/skeleton";

export function RaffleGrid({ raffles, isLoading }: { raffles?: Raffle[]; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-80 rounded-lg bg-card border border-border animate-pulse overflow-hidden">
            <div className="h-32 bg-white/5" />
            <div className="p-5 space-y-4">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
              <div className="h-10 bg-white/10 rounded mt-6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!raffles || raffles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-border bg-card/50">
        <div className="p-4 rounded-full bg-primary/10 mb-4\">
          <Ticket className="h-8 w-8 text-primary" />
        </div>
        <p className="text-lg font-semibold text-white mb-2">No Active Raffles</p>
        <p className="text-sm text-muted max-w-sm\">Check back soon for new draws, or create your own raffle!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {raffles.map((raffle) => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
