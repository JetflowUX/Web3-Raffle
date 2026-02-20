import type { Raffle } from "../lib/types";
import { RaffleCard } from "./RaffleCard";
import { Skeleton } from "./ui/skeleton";

export function RaffleGrid({ raffles, isLoading }: { raffles?: Raffle[]; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-56" />
        ))}
      </div>
    );
  }

  if (!raffles || raffles.length === 0) {
    return <p className="text-sm text-muted">No active raffles yet.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {raffles.map((raffle) => (
        <RaffleCard key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
