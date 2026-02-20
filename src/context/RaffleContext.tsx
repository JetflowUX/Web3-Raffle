import React, { useEffect, useState, createContext, useContext } from 'react';
import { Raffle, Ticket, Winner } from '../lib/types';
import { mockContract } from '../lib/contract';
import { useWallet } from './WalletContext';
interface RaffleContextType {
  raffles: Raffle[];
  userTickets: Ticket[];
  winners: Winner[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  enterRaffle: (raffleId: string, ticketCount: number) => Promise<string>;
  createRaffle: (data: any) => Promise<string>;
}
const RaffleContext = createContext<RaffleContextType | undefined>(undefined);
export function RaffleProvider({ children }: {children: React.ReactNode;}) {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useWallet();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [fetchedRaffles, fetchedWinners] = await Promise.all([
      mockContract.getRaffles(),
      mockContract.getWinners()]
      );
      setRaffles(fetchedRaffles);
      setWinners(fetchedWinners);
      if (address) {
        const tickets = await mockContract.getUserTickets(address);
        setUserTickets(tickets);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [address]);
  const enterRaffle = async (raffleId: string, ticketCount: number) => {
    if (!address) throw new Error('Wallet not connected');
    const { txHash } = await mockContract.enterRaffle(
      raffleId,
      ticketCount,
      address
    );
    // Optimistic update or refetch
    await fetchData();
    return txHash;
  };
  const createRaffle = async (data: any) => {
    if (!address) throw new Error('Wallet not connected');
    const { txHash } = await mockContract.createRaffle(data);
    await fetchData();
    return txHash;
  };
  return (
    <RaffleContext.Provider
      value={{
        raffles,
        userTickets,
        winners,
        isLoading,
        refreshData: fetchData,
        enterRaffle,
        createRaffle
      }}>

      {children}
    </RaffleContext.Provider>);

}
export function useRaffles() {
  const context = useContext(RaffleContext);
  if (context === undefined) {
    throw new Error('useRaffles must be used within a RaffleProvider');
  }
  return context;
}