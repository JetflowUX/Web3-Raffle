export type RaffleStatus = 'active' | 'drawing' | 'completed';

export interface Raffle {
  id: string;
  title: string;
  description: string;
  prizePool: string; // ETH amount
  ticketPrice: string; // ETH amount
  maxParticipants: number;
  currentParticipants: number;
  endTime: Date;
  status: RaffleStatus;
  winner: string | null; // Address
  creatorAddress: string;
  participants: string[]; // Array of addresses
  image?: string; // Optional image for the prize
}

export interface Ticket {
  id: string;
  raffleId: string;
  raffleTitle: string;
  ticketCount: number;
  purchaseDate: Date;
  status: RaffleStatus;
  totalCost: string;
}

export interface Winner {
  id: string;
  address: string;
  prizeAmount: string;
  raffleId: string;
  raffleTitle: string;
  date: Date;
  txHash: string;
}

export interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  chainId: number;
}