import React from 'react';
import { useRaffles } from '../context/RaffleContext';
import { WinnerCard } from '../components/WinnerCard';
import { PageLoader } from '../components/ui/Loader';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
export function Winners() {
  const { winners, isLoading } = useRaffles();
  if (isLoading) return <PageLoader />;
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Recent Winners</h1>
          <p className="text-gray-400">
            Celebrating the lucky participants of ChainRaffle.
          </p>
        </div>

        <div className="space-y-4">
          {winners.map((winner, index) =>
          <motion.div
            key={winner.id}
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.1
            }}>

              <WinnerCard winner={winner} />
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}