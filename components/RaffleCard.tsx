"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Clock, Ticket, Zap } from "lucide-react";

import type { Raffle } from "../lib/types";
import { EnterRaffleModal } from "./EnterRaffleModal";
import { Countdown } from "./Countdown";

const headerGradients = [
  "from-blue-500 via-blue-600 to-blue-700",
  "from-purple-500 via-purple-600 to-purple-700",
  "from-emerald-500 via-emerald-600 to-emerald-700",
  "from-orange-500 via-orange-600 to-orange-700",
  "from-pink-500 via-pink-600 to-pink-700",
  "from-cyan-500 via-cyan-600 to-cyan-700"
];

export function RaffleCard({ raffle }: { raffle: Raffle }) {
  const gradientClass = headerGradients[parseInt(raffle.id) % headerGradients.length];
  const isActive = raffle.status === "Active";
  
  return (
    <Link href={`/raffle/${raffle.id}`}>
      <motion.div 
        whileHover={{ y: -6, scale: 1.02 }} 
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group h-full"
      >
        <div className="raffle-card h-full flex flex-col overflow-hidden shadow-lg">
          {/* Header with gradient and prize info */}
          <div className={`relative bg-gradient-to-br ${gradientClass} p-6 overflow-hidden`}>
            {/* Animated shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
            </div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-white/90 text-xs font-medium uppercase tracking-wide">Prize Pool</p>
                <p className="text-white text-3xl font-bold drop-shadow-lg">{raffle.prizePool} <span className="text-xl">ETH</span></p>
              </div>
              {isActive && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="prize-badge backdrop-blur-md"
                >
                  <Zap className="h-3.5 w-3.5 animate-pulse" />
                  <span>Live</span>
                </motion.div>
              )}
            </div>
            {/* Decorative overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </div>

          {/* Card content */}
          <div className="flex-1 p-5 flex flex-col bg-gradient-to-b from-transparent to-black/10">
            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="stat-row hover:bg-white/5 rounded-md px-2 transition-colors">
                <div className="stat-label">
                  <Ticket className="h-4 w-4 text-primary" />
                  <span>Ticket Price</span>
                </div>
                <span className="stat-value">{raffle.ticketPrice} ETH</span>
              </div>
              
              <div className="stat-row hover:bg-white/5 rounded-md px-2 transition-colors">
                <div className="stat-label">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Players</span>
                </div>
                <span className="stat-value">{raffle.participants}</span>
              </div>
              
              <div className="stat-row hover:bg-white/5 rounded-md px-2 transition-colors">
                <div className="stat-label">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Ends In</span>
                </div>
                <Countdown endsAt={raffle.endsAt} />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

            {/* Enter button */}
            <div className="mt-auto" onClick={(e) => e.preventDefault()}>
              <EnterRaffleModal raffle={raffle} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

