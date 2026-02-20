import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRaffles } from '../context/RaffleContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageLoader } from '../components/ui/Loader';
import { EnterRaffleModal } from '../components/EnterRaffleModal';
import { formatEth, formatAddress, formatTimeRemaining } from '../lib/utils';
import { Clock, Users, Trophy, Share2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
export function RaffleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { raffles, isLoading } = useRaffles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const raffle = raffles.find((r) => r.id === id);
  if (isLoading) return <PageLoader />;
  if (!raffle)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Raffle Not Found</h2>
        <Button
        onClick={() => navigate('/')}
        leftIcon={<ArrowLeft className="h-4 w-4" />}>

          Back to Home
        </Button>
      </div>);

  const progress = raffle.currentParticipants / raffle.maxParticipants * 100;
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">

          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.5
            }}>

            <div className="relative rounded-2xl overflow-hidden aspect-square border border-gray-800 shadow-2xl">
              <img
                src={raffle.image}
                alt={raffle.title}
                className="w-full h-full object-cover" />

              <div className="absolute top-4 left-4">
                <Badge status={raffle.status} className="text-sm px-3 py-1" />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="flex flex-col">

            <h1 className="text-4xl font-bold text-white mb-4">
              {raffle.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                <span>
                  Created by{' '}
                  <span className="text-white font-medium">
                    {formatAddress(raffle.creatorAddress)}
                  </span>
                </span>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <Card className="p-6 mb-8 bg-[#111827]/50">
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    Prize Pool
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatEth(raffle.prizePool)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    Ticket Price
                  </p>
                  <p className="text-3xl font-bold text-indigo-400">
                    {formatEth(raffle.ticketPrice)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Users className="h-4 w-4" /> Participants
                    </span>
                    <span className="text-white font-medium">
                      {raffle.currentParticipants} / {raffle.maxParticipants}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`
                      }} />

                  </div>
                </div>

                <div className="flex justify-between text-sm py-4 border-t border-gray-800">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Time Remaining
                  </span>
                  <span className="text-white font-medium font-mono">
                    {formatTimeRemaining(raffle.endTime)}
                  </span>
                </div>

                {raffle.status === 'active' ?
                <Button
                  size="lg"
                  className="w-full text-lg"
                  onClick={() => setIsModalOpen(true)}>

                    Enter Raffle
                  </Button> :

                <Button
                  size="lg"
                  className="w-full"
                  disabled
                  variant="secondary">

                    Raffle Ended
                  </Button>
                }
              </div>
            </Card>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-bold text-white mb-4">Description</h3>
              <p className="text-gray-400 leading-relaxed">
                {raffle.description}
              </p>
            </div>

            {raffle.winner &&
            <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-yellow-500 font-bold uppercase text-sm tracking-wider">
                    Winner Announced
                  </p>
                  <p className="text-white font-medium text-lg">
                    {formatAddress(raffle.winner)}
                  </p>
                </div>
              </div>
            }
          </motion.div>
        </div>
      </div>

      <EnterRaffleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        raffle={raffle} />

    </div>);

}