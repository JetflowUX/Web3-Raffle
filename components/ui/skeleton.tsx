import { cn } from "../../lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-xl bg-[linear-gradient(90deg,rgba(17,24,39,0.4),rgba(31,41,55,0.6),rgba(17,24,39,0.4))] bg-[length:400px_100%]",
        className
      )}
    />
  );
}
