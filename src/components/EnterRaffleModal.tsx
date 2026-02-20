import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Raffle } from '../lib/types';
import { formatEth } from '../lib/utils';
import { useRaffles } from '../context/RaffleContext';
import { useWallet } from '../context/WalletContext';
import { Ticket, AlertCircle, CheckCircle2 } from 'lucide-react';
interface EnterRaffleModalProps {
  isOpen: boolean;
  onClose: () => void;
  raffle: Raffle;
}
export function EnterRaffleModal({
  isOpen,
  onClose,
  raffle
}: EnterRaffleModalProps) {
  const [ticketCount, setTicketCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { enterRaffle } = useRaffles();
  const { isConnected, connect } = useWallet();
  const totalCost = (ticketCount * parseFloat(raffle.ticketPrice)).toFixed(4);
  const handleSubmit = async () => {
    if (!isConnected) {
      await connect();
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await enterRaffle(raffle.id, ticketCount);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setTicketCount(1);
      }, 2000);
    } catch (err) {
      setError('Transaction failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (success) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Success!">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Tickets Purchased!
          </h3>
          <p className="text-gray-400 mb-6">
            You have successfully entered the raffle for {raffle.title}.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </Modal>);

  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Enter Raffle: ${raffle.title}`}>

      <div className="space-y-6">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Ticket Price</span>
            <span className="text-white font-medium">
              {formatEth(raffle.ticketPrice)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Available Spots</span>
            <span className="text-white font-medium">
              {raffle.maxParticipants - raffle.currentParticipants}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Number of Tickets
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
              className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 text-white flex items-center justify-center hover:bg-gray-700 transition-colors">

              -
            </button>
            <div className="flex-1">
              <Input
                type="number"
                min="1"
                max={raffle.maxParticipants - raffle.currentParticipants}
                value={ticketCount}
                onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                className="text-center" />

            </div>
            <button
              onClick={() =>
              setTicketCount(
                Math.min(
                  raffle.maxParticipants - raffle.currentParticipants,
                  ticketCount + 1
                )
              )
              }
              className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 text-white flex items-center justify-center hover:bg-gray-700 transition-colors">

              +
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-white">Total Cost</span>
            <span className="text-2xl font-bold text-indigo-400">
              {formatEth(totalCost)}
            </span>
          </div>

          {error &&
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          }

          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="w-full"
            size="lg"
            leftIcon={!isConnected ? <Ticket className="h-5 w-5" /> : undefined}>

            {isConnected ? 'Confirm Purchase' : 'Connect Wallet to Enter'}
          </Button>
        </div>
      </div>
    </Modal>);

}