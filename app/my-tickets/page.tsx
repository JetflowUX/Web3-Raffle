"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useUserTickets } from "../../hooks/useUserTickets";
import { useRaffles } from "../../hooks/useRaffles";
import { formatToken } from "../../lib/utils";
import { ArrowLeft } from "lucide-react";

export default function MyTicketsPage() {
  const { data: tickets, isLoading } = useUserTickets();
  const { data: raffles } = useRaffles();

  const handleClaimReward = async (ticketId: string, raffleId: string) => {
    try {
      toast.loading("Processing claim...");
      // Simulate claim processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const successMessage = "Reward claimed for Raffle #" + raffleId + "!";
      toast.success(successMessage);
    } catch (error) {
      toast.error("Failed to claim reward. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="mx-auto w-full max-w-6xl px-6 py-16">Loading tickets...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted transition hover:text-text">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">My tickets</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text">Your active entries</h1>
      </div>

      {tickets && tickets.length === 0 ? (
        <div className="mt-8 space-y-4">
          <p className="text-xs sm:text-sm text-muted">No tickets yet. Enter a raffle to get started.</p>
          <Button asChild>
            <Link href="/">Enter a raffle</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:gap-6 xs:grid-cols-1 md:grid-cols-2">
            const raffle = raffles?.find((item) => item.id === ticket.raffleId);
            const raffleLink = `/raffle/${ticket.raffleId}`;
            const prizeDisplay = raffle ? formatToken(raffle.prizePool) + " ETH" : "-";
            
            return (
              <Card key={ticket.raffleId} className="glass-card">
                <CardContent className="space-y-4">
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0">
                    <Link
                      href={raffleLink}
                      className="text-xs sm:text-sm text-muted transition hover:text-text hover:underline"
                    >
                      Raffle #{ticket.raffleId}
                    </Link>
                    <Badge className="border-primary/40 text-primary w-fit">{ticket.status}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Tickets owned</p>
                    <p className="text-xl sm:text-2xl font-semibold text-text">{ticket.tickets}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted">
                    <span>Prize pool</span>
                    <span className="text-text">{prizeDisplay}</span>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-2">
                    {ticket.isWinner ? (
                      <>
                        <Button 
                          className="flex-1 text-xs sm:text-sm"
                          onClick={() => handleClaimReward(ticket.raffleId, ticket.raffleId)}
                        >
                          Claim reward
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={raffleLink}>View raffle</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" disabled className="flex-1 text-xs sm:text-sm">
                          Waiting for draw
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={raffleLink}>Details</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
