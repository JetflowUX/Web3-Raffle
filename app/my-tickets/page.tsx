"use client";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useUserTickets } from "../../hooks/useUserTickets";
import { useRaffles } from "../../hooks/useRaffles";
import { formatToken } from "../../lib/utils";

export default function MyTicketsPage() {
  const { data: tickets, isLoading } = useUserTickets();
  const { data: raffles } = useRaffles();

  if (isLoading) {
    return <div className="mx-auto w-full max-w-6xl px-6 py-16">Loading tickets...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">My tickets</p>
        <h1 className="font-display text-3xl font-semibold text-text">Your active entries</h1>
      </div>

      {tickets && tickets.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No tickets yet. Enter a raffle to get started.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {tickets?.map((ticket) => {
            const raffle = raffles?.find((item) => item.id === ticket.raffleId);
            return (
              <Card key={ticket.raffleId} className="glass-card">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted">Raffle #{ticket.raffleId}</p>
                    <Badge className="border-primary/40 text-primary">{ticket.status}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Tickets owned</p>
                    <p className="text-2xl font-semibold text-text">{ticket.tickets}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>Prize pool</span>
                    <span className="text-text">
                      {raffle ? `${formatToken(raffle.prizePool)} ETH` : "-"}
                    </span>
                  </div>
                  {ticket.isWinner ? (
                    <Button variant="success">Claim reward</Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Waiting for draw
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
