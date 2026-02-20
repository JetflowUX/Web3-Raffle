"use client";

import { useState } from "react";
import { toast } from "sonner";

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
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed.";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Create raffle</p>
        <h1 className="font-display text-3xl font-semibold text-text">Launch a new draw</h1>
      </div>

      <Card className="mt-8 glass-card">
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm text-muted">Ticket price (ETH)</label>
            <Input value={ticketPrice} onChange={(event) => setTicketPrice(event.target.value)} />
          </div>
          <div>
            <label className="text-sm text-muted">Maximum participants</label>
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
            <label className="text-sm text-muted">Duration (seconds)</label>
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
            <label className="text-sm text-muted">Prize amount (ETH)</label>
            <Input value={prizeAmount} onChange={(event) => setPrizeAmount(event.target.value)} />
          </div>
          <Button onClick={handleSubmit} disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create raffle"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
