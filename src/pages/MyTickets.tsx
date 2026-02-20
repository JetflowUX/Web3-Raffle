import React from 'react';
import { useRaffles } from '../context/RaffleContext';
import { useWallet } from '../context/WalletContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PageLoader } from '../components/ui/Loader';
import { formatEth, formatDate } from '../lib/utils';
import { Ticket as TicketIcon, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
export function MyTickets() {
  const { userTickets, isLoading } = useRaffles();
  const { isConnected, connect } = useWallet();
  if (isLoading) return <PageLoader />;
  if (!isConnected) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Wallet className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Wallet Not Connected
        </h2>
        <p className="text-gray-400 mb-8">
          Please connect your wallet to view your tickets.
        </p>
        <Button onClick={connect}>Connect Wallet</Button>
      </div>);

  }
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Tickets</h1>

        {userTickets.length === 0 ?
        <Card className="p-12 text-center">
            <TicketIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No Tickets Found
            </h3>
            <p className="text-gray-400">
              You haven't entered any raffles yet.
            </p>
          </Card> :

        <div className="space-y-4">
            {userTickets.map((ticket, index) =>
          <motion.div
            key={ticket.id}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}>

                <Card className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                      <TicketIcon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {ticket.raffleTitle}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Purchased on {formatDate(ticket.purchaseDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase">Tickets</p>
                      <p className="text-lg font-bold text-white">
                        {ticket.ticketCount}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase">Cost</p>
                      <p className="text-lg font-bold text-white">
                        {formatEth(ticket.totalCost)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge status={ticket.status} />
                    </div>
                  </div>
                </Card>
              </motion.div>
          )}
          </div>
        }
      </div>
    </div>);

}