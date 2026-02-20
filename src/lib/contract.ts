import { MOCK_RAFFLES, MOCK_TICKETS, MOCK_WINNERS } from './mockData';
import { Raffle, Ticket, Winner } from './types';
import { generateTxHash } from './utils';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockContract = {
  getRaffles: async (): Promise<Raffle[]> => {
    await delay(800);
    return [...MOCK_RAFFLES];
  },

  getRaffle: async (id: string): Promise<Raffle | undefined> => {
    await delay(500);
    return MOCK_RAFFLES.find((r) => r.id === id);
  },

  enterRaffle: async (
  raffleId: string,
  ticketCount: number,
  address: string)
  : Promise<{txHash: string;success: boolean;}> => {
    await delay(2000); // Simulate transaction time

    // 10% chance of failure for realism
    if (Math.random() < 0.1) {
      throw new Error('Transaction rejected by user');
    }

    return {
      txHash: generateTxHash(),
      success: true
    };
  },

  createRaffle: async (
  data: Partial<Raffle>)
  : Promise<{txHash: string;id: string;}> => {
    await delay(2500);
    return {
      txHash: generateTxHash(),
      id: Math.random().toString(36).substr(2, 9)
    };
  },

  getUserTickets: async (address: string): Promise<Ticket[]> => {
    await delay(1000);
    // In a real app, we'd filter by address. Here we just return mock tickets
    return [...MOCK_TICKETS];
  },

  getWinners: async (): Promise<Winner[]> => {
    await delay(800);
    return [...MOCK_WINNERS];
  }
};