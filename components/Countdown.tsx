"use client";

import { useEffect, useState } from "react";

import { getTimeRemaining } from "../lib/utils";

export function Countdown({ endsAt }: { endsAt: number }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(endsAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(endsAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (remaining.diff <= 0) {
    return <span className="text-xs text-muted">Closed</span>;
  }

  return (
    <span className="text-xs text-muted">
      {remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
    </span>
  );
}
