import type { Raffle } from "../lib/types";
import { RaffleCard } from "./RaffleCard";
import { Skeleton } from "./ui/skeleton";

export function RaffleGrid({ raffles, isLoading }: { raffles?: Raffle[]; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!raffles || raffles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-text">No active raffles</p>
        <p className="text-sm text-muted mt-1">Check back soon for new draws!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {raffles.map((raffle) => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
