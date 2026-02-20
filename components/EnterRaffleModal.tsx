"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import type { Raffle } from "../lib/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useEnterRaffle } from "../hooks/useEnterRaffle";
import { clampNumber, formatToken } from "../lib/utils";
import { useWallet } from "../hooks/useWallet";

export function EnterRaffleModal({ raffle }: { raffle: Raffle }) {
  const [open, setOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const { isConnected } = useWallet();
  const enterMutation = useEnterRaffle();

  const totalCost = useMemo(() => {
    return Number(raffle.ticketPrice) * ticketCount;
  }, [raffle.ticketPrice, ticketCount]);

  const handleSubmit = async () => {
    try {
      await enterMutation.mutateAsync({
        raffleId: raffle.id,
        ticketCount,
        totalCost: totalCost.toString()
      });
      toast.success("Transaction submitted.");
      setTicketCount(1);
      setOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed.";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={raffle.status !== "Active"}>
          Enter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Raffle #{raffle.id}</DialogTitle>
          <DialogDescription>
            Confirm the number of tickets and complete the transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-muted">Tickets</label>
            <Input
              type="number"
              min={1}
              value={ticketCount}
              onChange={(event) =>
                setTicketCount(clampNumber(Number(event.target.value), 1, 99))
              }
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted">
            <span>Total cost</span>
            <span className="text-text">{formatToken(totalCost)} ETH</span>
          </div>
          {!isConnected && (
            <p className="text-xs text-accent">Connect a wallet to enter.</p>
          )}
        </div>

        <Button
          className="mt-6 w-full"
          onClick={handleSubmit}
          disabled={!isConnected || enterMutation.isPending}
        >
          {enterMutation.isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Waiting for confirmation
            </span>
          ) : (
            "Confirm Entry"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
