"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

import type { Raffle } from "../lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Countdown } from "./Countdown";
import { EnterRaffleModal } from "./EnterRaffleModal";

export function RaffleCard({ raffle }: { raffle: Raffle }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="glass-card">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Badge className="border-primary/40 text-primary">{raffle.status}</Badge>
            <Countdown endsAt={raffle.endsAt} />
          </div>
          <div>
            <p className="text-sm text-muted">Prize Pool</p>
            <p className="text-2xl font-semibold text-text">{raffle.prizePool} ETH</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted">
            <span>Ticket Price</span>
            <span className="text-text">{raffle.ticketPrice} ETH</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Participants
            </span>
            <span className="text-text">{raffle.participants}</span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-3">
          <EnterRaffleModal raffle={raffle} />
          <Button variant="outline" size="sm" asChild>
            <Link href={`/raffle/${raffle.id}`}>View details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
