"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Clock, Ticket } from "lucide-react";

import type { Raffle } from "../lib/types";
import { Badge } from "./ui/badge";
import { EnterRaffleModal } from "./EnterRaffleModal";
import { Countdown } from "./Countdown";

const gradients = [
  "from-cyan-500 via-blue-500 to-purple-600",
  "from-pink-500 via-red-500 to-orange-600",
  "from-green-500 via-emerald-500 to-teal-600",
  "from-yellow-500 via-orange-500 to-red-600",
  "from-indigo-500 via-purple-500 to-pink-600",
  "from-blue-500 via-cyan-500 to-green-600"
];

export function RaffleCard({ raffle }: { raffle: Raffle }) {
  const gradientClass = gradients[parseInt(raffle.id) % gradients.length];
  
  return (
    <Link href={`/raffle/${raffle.id}`}>
      <motion.div 
        whileHover={{ y: -6, scale: 1.02 }} 
        transition={{ duration: 0.2 }}
        className="group"
      >
        <div className="relative overflow-hidden rounded-lg bg-[#1a2c38] shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20">
          {/* Colorful gradient header */}
          <div className={`relative h-40 bg-gradient-to-br ${gradientClass} p-4`}>
            <div className="absolute top-3 right-3">
              <Badge className="border-white/30 bg-black/40 text-white backdrop-blur-sm font-semibold">
                {raffle.status}
              </Badge>
            </div>
            
            {/* Prize pool - prominent */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-medium text-white/80 uppercase tracking-wide">Prize Pool</p>
              <p className="mt-1 text-3xl font-bold text-white">{raffle.prizePool} ETH</p>
            </div>
          </div>
          
          {/* Card content */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <Ticket className="h-4 w-4" />
                <span className="text-sm">Ticket Price</span>
              </div>
              <span className="text-sm font-bold text-white">{raffle.ticketPrice} ETH</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <Users className="h-4 w-4" />
                <span className="text-sm">Players</span>
              </div>
              <span className="text-sm font-bold text-white">{raffle.participants}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-[#2f4553] pt-3">
              <div className="flex items-center gap-2 text-text-muted">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Ends In</span>
              </div>
              <Countdown endsAt={raffle.endsAt} />
            </div>
            
            {/* Enter button */}
            <div className="pt-2" onClick={(e) => e.preventDefault()}>
              <EnterRaffleModal raffle={raffle} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
