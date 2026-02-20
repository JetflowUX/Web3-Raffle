import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaffles } from '../context/RaffleContext';
import { useWallet } from '../context/WalletContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import {
  PlusCircle,
  Image as ImageIcon,
  Calendar,
  DollarSign,
  Users } from
'lucide-react';
import { motion } from 'framer-motion';
export function CreateRaffle() {
  const navigate = useNavigate();
  const { createRaffle } = useRaffles();
  const { isConnected, connect } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prizePool: '',
    ticketPrice: '',
    maxParticipants: '',
    duration: '3' // days
  });
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>

  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      await connect();
      return;
    }
    setIsSubmitting(true);
    try {
      await createRaffle(formData);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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
            duration: 0.5
          }}>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create New Raffle
            </h1>
            <p className="text-gray-400">
              Launch your own decentralized raffle in minutes.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="Raffle Title"
                  name="title"
                  placeholder="e.g. Bored Ape #8817"
                  value={formData.title}
                  onChange={handleChange}
                  required />

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="w-full bg-[#0B0F1A] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                  placeholder="Describe the prize and raffle details..."
                  value={formData.description}
                  onChange={handleChange}
                  required />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Prize Pool (ETH)"
                  name="prizePool"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  rightElement={<span className="text-xs font-bold">ETH</span>}
                  value={formData.prizePool}
                  onChange={handleChange}
                  required />

                <Input
                  label="Ticket Price (ETH)"
                  name="ticketPrice"
                  type="number"
                  step="0.001"
                  placeholder="0.00"
                  rightElement={<span className="text-xs font-bold">ETH</span>}
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  required />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Max Participants"
                  name="maxParticipants"
                  type="number"
                  placeholder="1000"
                  rightElement={<Users className="h-4 w-4" />}
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required />

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Duration
                  </label>
                  <div className="relative">
                    <select
                      name="duration"
                      className="w-full bg-[#0B0F1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 appearance-none"
                      value={formData.duration}
                      onChange={handleChange}>

                      <option value="1">1 Day</option>
                      <option value="3">3 Days</option>
                      <option value="7">7 Days</option>
                      <option value="14">14 Days</option>
                    </select>
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Image Upload Placeholder */}
              <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-500/20 transition-colors">
                  <ImageIcon className="h-6 w-6 text-gray-400 group-hover:text-indigo-400" />
                </div>
                <p className="text-sm text-gray-300 font-medium">
                  Upload Prize Image
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={
                  !isConnected ? undefined :
                  <PlusCircle className="h-5 w-5" />

                  }>

                  {isConnected ? 'Create Raffle' : 'Connect Wallet to Create'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>);

}