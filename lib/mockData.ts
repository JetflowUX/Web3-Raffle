import type { Raffle, UserTicketSummary, WinnerRecord } from "./types";

const now = Math.floor(Date.now() / 1000);

const mockState = {
  raffles: [
    {
      id: "1",
      prizePool: "12.5",
      ticketPrice: "0.05",
      participants: 214,
      maxParticipants: 500,
      endsAt: now + 6 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Ethereum"
    },
    {
      id: "2",
      prizePool: "4.2",
      ticketPrice: "0.01",
      participants: 80,
      maxParticipants: 200,
      endsAt: now + 2 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Solana"
    },
    {
      id: "3",
      prizePool: "25.0",
      ticketPrice: "0.1",
      participants: 500,
      maxParticipants: 500,
      endsAt: now - 3600,
      status: "Completed",
      winner: "0x92f7a35b3d2d0aC87bA2b28300b2E871dDf4c9aA",
      blockchain: "Ethereum"
    },
    {
      id: "4",
      prizePool: "8.7",
      ticketPrice: "0.02",
      participants: 145,
      maxParticipants: 300,
      endsAt: now + 12 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Polkadot"
    },
    {
      id: "5",
      prizePool: "15.3",
      ticketPrice: "0.08",
      participants: 256,
      maxParticipants: 400,
      endsAt: now + 18 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Cardano"
    },
    {
      id: "6",
      prizePool: "32.1",
      ticketPrice: "0.15",
      participants: 400,
      maxParticipants: 400,
      endsAt: now - 7200,
      status: "Completed",
      winner: "0xA14B1E9b4c5d1c7f39A4d65c9dD4C4bCbAa1c1C1",
      blockchain: "Aptos"
    },
    {
      id: "7",
      prizePool: "6.5",
      ticketPrice: "0.025",
      participants: 92,
      maxParticipants: 250,
      endsAt: now + 4 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Avalanche"
    },
    {
      id: "8",
      prizePool: "18.9",
      ticketPrice: "0.09",
      participants: 310,
      maxParticipants: 450,
      endsAt: now + 24 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Solana"
    },
    {
      id: "9",
      prizePool: "9.8",
      ticketPrice: "0.03",
      participants: 188,
      maxParticipants: 350,
      endsAt: now - 1800,
      status: "Completed",
      winner: "0xE35f5A716fB0aBd4a1A3E67a2A8B2e1B3d5a4A6e",
      blockchain: "Polkadot"
    },
    {
      id: "10",
      prizePool: "22.4",
      ticketPrice: "0.12",
      participants: 275,
      maxParticipants: 500,
      endsAt: now + 36 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Ethereum"
    },
    {
      id: "11",
      prizePool: "5.6",
      ticketPrice: "0.015",
      participants: 67,
      maxParticipants: 200,
      endsAt: now + 8 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Cardano"
    },
    {
      id: "12",
      prizePool: "42.0",
      ticketPrice: "0.2",
      participants: 500,
      maxParticipants: 500,
      endsAt: now - 5400,
      status: "Completed",
      winner: "0x1C6b593a0fcbE61B2aCA1E4BD12cF1a6f2F9aF49",
      blockchain: "Avalanche"
    },
    {
      id: "13",
      prizePool: "11.2",
      ticketPrice: "0.04",
      participants: 156,
      maxParticipants: 300,
      endsAt: now + 15 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Aptos"
    },
    {
      id: "14",
      prizePool: "7.8",
      ticketPrice: "0.022",
      participants: 98,
      maxParticipants: 250,
      endsAt: now + 9 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Solana"
    },
    {
      id: "15",
      prizePool: "28.5",
      ticketPrice: "0.14",
      participants: 380,
      maxParticipants: 450,
      endsAt: now + 48 * 3600,
      status: "Active",
      winner: null,
      blockchain: "Ethereum"
    }
  ] as Raffle[],
  participants: {
    "1": [
      "0x1C6b593a0fcbE61B2aCA1E4BD12cF1a6f2F9aF49",
      "0x92f7a35b3d2d0aC87bA2b28300b2E871dDf4c9aA",
      "0xA14B1E9b4c5d1c7f39A4d65c9dD4C4bCbAa1c1C1"
    ],
    "2": ["0xE35f5A716fB0aBd4a1A3E67a2A8B2e1B3d5a4A6e"],
    "3": [
      "0x92f7a35b3d2d0aC87bA2b28300b2E871dDf4c9aA",
      "0xE35f5A716fB0aBd4a1A3E67a2A8B2e1B3d5a4A6e"
    ]
  } as Record<string, string[]>,
  userTickets: {
    "0xdemo": [
      { raffleId: "1", tickets: 4, status: "Active" },
      { raffleId: "3", tickets: 2, status: "Completed", isWinner: true }
    ]
  } as Record<string, UserTicketSummary[]>,
  winners: [
    {
      id: "w1",
      raffleId: "3",
      winner: "0x92f7a35b3d2d0aC87bA2b28300b2E871dDf4c9aA",
      prize: "25.0",
      date: new Date((now - 3600) * 1000).toISOString(),
      txHash: "0x96b5e6c4c6eaf3e9808dc4f44a0f8136930f1b1a19762a1a66b4e2f4a8c12abc"
    }
  ] as WinnerRecord[]
};

export async function getMockRaffles() {
  return [...mockState.raffles];
}

export async function getMockRaffle(id: string) {
  return mockState.raffles.find((raffle) => raffle.id === id) ?? null;
}

export async function getMockParticipants(id: string) {
  return mockState.participants[id] ?? [];
}

export async function getMockWinners() {
  return [...mockState.winners];
}

export async function getMockUserTickets(address?: string | null) {
  if (!address) return [];
  return mockState.userTickets[address] ?? [];
}

export async function enterMockRaffle({
  raffleId,
  ticketCount,
  address
}: {
  raffleId: string;
  ticketCount: number;
  address: string;
}) {
  const raffle = mockState.raffles.find((item) => item.id === raffleId);
  if (!raffle) throw new Error("Raffle not found.");

  const totalCost = Number(raffle.ticketPrice) * ticketCount;
  raffle.prizePool = (Number(raffle.prizePool) + totalCost).toFixed(2);
  raffle.participants += ticketCount;

  const participants = mockState.participants[raffleId] ?? [];
  participants.push(address);
  mockState.participants[raffleId] = participants;

  const summary = mockState.userTickets[address] ?? [];
  const existing = summary.find((item) => item.raffleId === raffleId);
  if (existing) {
    existing.tickets += ticketCount;
  } else {
    summary.push({ raffleId, tickets: ticketCount, status: raffle.status });
  }
  mockState.userTickets[address] = summary;

  return {
    txHash: `0xmock${Math.random().toString(16).slice(2)}`
  };
}

export async function createMockRaffle({
  ticketPrice,
  maxParticipants,
  duration,
  prizeAmount
}: {
  ticketPrice: string;
  maxParticipants: number;
  duration: number;
  prizeAmount: string;
}) {
  const id = String(mockState.raffles.length + 1);
  mockState.raffles.unshift({
    id,
    prizePool: prizeAmount,
    ticketPrice,
    participants: 0,
    maxParticipants,
    endsAt: now + duration,
    status: "Active",
    winner: null,
    blockchain: "Ethereum"
  });

  return { id };
}
