"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { ParticipantsList } from "../../../components/ParticipantsList";
import { Countdown } from "../../../components/Countdown";
import { useRaffle } from "../../../hooks/useRaffle";
import { useEnterRaffle } from "../../../hooks/useEnterRaffle";
import { clampNumber, formatAddress, formatToken } from "../../../lib/utils";

export default function RaffleDetailsPage({ params }: { params: { id: string } }) {
  const { raffleQuery, participantsQuery } = useRaffle(params.id);
  const raffle = raffleQuery.data;
  const [ticketCount, setTicketCount] = useState(1);
  const enterMutation = useEnterRaffle();

  const totalCost = useMemo(() => {
    if (!raffle) return 0;
    return Number(raffle.ticketPrice) * ticketCount;
  }, [raffle, ticketCount]);

  const handleEnter = async () => {
    if (!raffle) return;
    try {
      await enterMutation.mutateAsync({
        raffleId: raffle.id,
        ticketCount,
        totalCost: totalCost.toString()
      });
      toast.success("Entry confirmed.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed.";
      toast.error(message);
    }
  };

  if (raffleQuery.isLoading) {
    return <div className="mx-auto w-full max-w-6xl px-6 py-16">Loading raffle...</div>;
  }

  if (!raffle) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text">
          <ArrowLeft className="h-4 w-4" />
          Back to raffles
        </Link>
        <p className="mt-8 text-center text-text">Raffle not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to raffles
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Raffle #{raffle.id}</p>
              <h1 className="font-display text-3xl font-semibold text-text">Prize Pool</h1>
              <p className="text-3xl font-semibold text-text">{raffle.prizePool} ETH</p>
            </div>
            <Badge className="border-primary/40 text-primary">{raffle.status}</Badge>
          </div>

          <Card className="glass-card">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Ticket price</span>
                <span className="text-text">{raffle.ticketPrice} ETH</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Participants</span>
                <span className="text-text">{raffle.participants}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Time remaining</span>
                <span className="text-text">
                  <Countdown endsAt={raffle.endsAt} />
                </span>
              </div>
            </CardContent>
          </Card>

          {raffle.winner && (
            <Card className="glass-card">
              <CardContent>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Winner</p>
                <p className="text-lg font-semibold text-text">{formatAddress(raffle.winner)}</p>
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="font-display text-xl font-semibold text-text">Participants</h2>
            <div className="mt-4">
              <ParticipantsList participants={participantsQuery.data} />
            </div>
          </div>
        </div>

        <Card className="glass-card">
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted">Tickets</p>
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
            <Button
              onClick={handleEnter}
              disabled={enterMutation.isPending || raffle.status !== "Active"}
            >
              {enterMutation.isPending ? "Waiting for confirmation" : "Enter raffle"}
            </Button>
            {enterMutation.isSuccess && (
              <p className="text-xs text-accent">Transaction submitted successfully.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
