"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { formatAddress } from "../lib/utils";
import { Button } from "./ui/button";

export function ParticipantsList({ participants }: { participants?: string[] }) {
  if (!participants || participants.length === 0) {
    return <p className="text-sm text-muted">No participants yet.</p>;
  }

  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    toast.success("Address copied.");
  };

  return (
    <div className="space-y-3">
      {participants.map((address) => (
        <div
          key={address}
          className="flex items-center justify-between rounded-xl border border-border bg-card/70 px-4 py-3"
        >
          <span className="text-sm text-text">{formatAddress(address)}</span>
          <Button variant="ghost" size="sm" onClick={() => copyAddress(address)}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
