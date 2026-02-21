"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useCreateRaffle } from "../../hooks/useCreateRaffle";
import { clampNumber } from "../../lib/utils";

export default function CreateRafflePage() {
  const [ticketPrice, setTicketPrice] = useState("0.05");
  const [maxParticipants, setMaxParticipants] = useState(250);
  const [duration, setDuration] = useState(7200);
  const [prizeAmount, setPrizeAmount] = useState("10");
  const createMutation = useCreateRaffle();

  const handleSubmit = async () => {
    try {
      await createMutation.mutateAsync({ ticketPrice, maxParticipants, duration, prizeAmount });
      toast.success("Raffle created.");
      // Reset form after success
      setTicketPrice("0.05");
      setMaxParticipants(250);
      setDuration(7200);
      setPrizeAmount("10");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed.";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted transition hover:text-text mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to raffles
      </Link>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Create raffle</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Launch a new draw</h1>
      </div>

      <Card className="mt-6 sm:mt-8 glass-card">
        <CardContent className="space-y-4 sm:space-y-6">
          <div>
            <label className="text-xs sm:text-sm text-muted">Ticket price (ETH)</label>
            <Input value={ticketPrice} onChange={(event) => setTicketPrice(event.target.value)} />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-muted">Maximum participants</label>
            <Input
              type="number"
              min={2}
              value={maxParticipants}
              onChange={(event) =>
                setMaxParticipants(clampNumber(Number(event.target.value), 2, 9999))
              }
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-muted">Duration (seconds)</label>
            <Input
              type="number"
              min={300}
              value={duration}
              onChange={(event) =>
                setDuration(clampNumber(Number(event.target.value), 300, 604800))
              }
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-muted">Prize amount (ETH)</label>
            <Input value={prizeAmount} onChange={(event) => setPrizeAmount(event.target.value)} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleSubmit} disabled={createMutation.isPending} className="flex-1">
              {createMutation.isPending ? "Creating..." : "Create raffle"}
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
