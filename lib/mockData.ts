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
      winner: null
    },
    {
      id: "2",
      prizePool: "4.2",
      ticketPrice: "0.01",
      participants: 80,
      maxParticipants: 200,
      endsAt: now + 2 * 3600,
      status: "Active",
      winner: null
    },
    {
      id: "3",
      prizePool: "25.0",
      ticketPrice: "0.1",
      participants: 500,
      maxParticipants: 500,
      endsAt: now - 3600,
      status: "Completed",
      winner: "0x92f7a35b3d2d0aC87bA2b28300b2E871dDf4c9aA"
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
    winner: null
  });

  return { id };
}
