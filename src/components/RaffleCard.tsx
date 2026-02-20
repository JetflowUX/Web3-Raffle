import React from 'react';
import { Link } from 'react-router-dom';
import { Raffle } from '../lib/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Clock, Users, Ticket as TicketIcon } from 'lucide-react';
import { formatEth, formatTimeRemaining } from '../lib/utils';
import { motion } from 'framer-motion';
interface RaffleCardProps {
  raffle: Raffle;
  index?: number;
}
export function RaffleCard({ raffle, index = 0 }: RaffleCardProps) {
  const progress = raffle.currentParticipants / raffle.maxParticipants * 100;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.1
      }}>

      <Card hoverEffect className="h-full flex flex-col group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={raffle.image || 'https://via.placeholder.com/400x200'}
            alt={raffle.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-80" />
          <div className="absolute top-3 right-3">
            <Badge status={raffle.status} />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-bold text-white truncate">
              {raffle.title}
            </h3>
            <p className="text-indigo-400 font-medium text-sm">
              Prize Pool: {formatEth(raffle.prizePool)}
            </p>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                Ticket Price
              </span>
              <div className="flex items-center gap-1.5 text-gray-200">
                <TicketIcon className="h-3.5 w-3.5 text-indigo-500" />
                <span className="font-semibold">
                  {formatEth(raffle.ticketPrice)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                Time Left
              </span>
              <div className="flex items-center gap-1.5 text-gray-200">
                <Clock className="h-3.5 w-3.5 text-indigo-500" />
                <span className="font-semibold">
                  {formatTimeRemaining(raffle.endTime)}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {raffle.currentParticipants}{' '}
                participants
              </span>
              <span>{raffle.maxParticipants} max</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`
                }} />

            </div>
          </div>

          <div className="mt-auto">
            <Link to={`/raffle/${raffle.id}`}>
              <Button
                variant="outline"
                className="w-full group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300">

                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>);

}