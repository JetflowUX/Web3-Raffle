"use client";

import { useEffect, useState } from "react";

import { getTimeRemaining } from "../lib/utils";

export function Countdown({ endsAt }: { endsAt: number }) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(() => getTimeRemaining(endsAt));

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(endsAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  // Prevent hydration mismatch by showing placeholder until mounted
  if (!mounted) {
    return <span className="text-sm font-semibold text-white">--:--:--</span>;
  }

  if (remaining.diff <= 0) {
    return <span className="text-sm font-medium text-muted">Ended</span>;
  }

  return (
    <span className="text-sm font-semibold text-white">
      {remaining.days}d {remaining.hours}h {remaining.minutes}m
    </span>
  );
}
