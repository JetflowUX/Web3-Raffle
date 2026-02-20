import React from 'react';
import { useRaffles } from '../context/RaffleContext';
import { RaffleCard } from '../components/RaffleCard';
import { Button } from '../components/ui/Button';
import { PageLoader } from '../components/ui/Loader';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export function Home() {
  const { raffles, isLoading } = useRaffles();
  const activeRaffles = raffles.filter((r) => r.status === 'active');
  if (isLoading) return <PageLoader />;
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative mb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
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
              duration: 0.6
            }}>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              The Web3 Raffle Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Win Blue-Chip NFTs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                & Crypto Prizes
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Participate in decentralized raffles with verifiable on-chain
              fairness. Connect your wallet and start winning today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Raffle
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-4 w-4" />}>

                Explore Winners
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
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
              duration: 0.6,
              delay: 0.2
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-y border-gray-800 py-8 bg-[#0B0F1A]/50 backdrop-blur-sm">

            {[
            {
              label: 'Total Volume',
              value: '1,240 ETH'
            },
            {
              label: 'Raffles Completed',
              value: '850+'
            },
            {
              label: 'Active Users',
              value: '12.5K'
            },
            {
              label: 'Total Winners',
              value: '850'
            }].
            map((stat, i) =>
            <div key={i}>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Active Raffles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Live Raffles</h2>
            <p className="text-gray-400">
              Don't miss out on these active draws.
            </p>
          </div>
          <Button
            variant="ghost"
            rightIcon={<ArrowRight className="h-4 w-4" />}>

            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRaffles.map((raffle, index) =>
          <RaffleCard key={raffle.id} raffle={raffle} index={index} />
          )}
        </div>
      </section>
    </div>);

}