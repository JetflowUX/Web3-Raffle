export type RaffleStatus = "Active" | "Drawing" | "Completed";

export type Blockchain = "Ethereum" | "Solana" | "Polkadot" | "Cardano" | "Aptos" | "Avalanche";

export interface Raffle {
  id: string;
  prizePool: string;
  ticketPrice: string;
  participants: number;
  maxParticipants?: number;
  endsAt: number;
  status: RaffleStatus;
  winner?: string | null;
  blockchain: Blockchain;
}

export interface WinnerRecord {
  id: string;
  raffleId: string;
  winner: string;
  prize: string;
  date: string;
  txHash?: string;
}

export interface UserTicketSummary {
  raffleId: string;
  tickets: number;
  status: RaffleStatus;
  isWinner?: boolean;
}
