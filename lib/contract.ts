import type { Address, WalletClient } from "viem";
import { createPublicClient, http, parseEther } from "viem";
import { mainnet, sepolia } from "viem/chains";

import type { Raffle } from "./types";
import {
  createMockRaffle,
  enterMockRaffle,
  getMockParticipants,
  getMockRaffle,
  getMockRaffles,
  getMockUserTickets,
  getMockWinners
} from "./mockData";

const raffleAbi = [
  {
    type: "function",
    name: "getRaffles",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "raffles",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "prizePool", type: "uint256" },
          { name: "ticketPrice", type: "uint256" },
          { name: "participants", type: "uint256" },
          { name: "maxParticipants", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "winner", type: "address" }
        ]
      }
    ]
  },
  {
    type: "function",
    name: "getRaffle",
    stateMutability: "view",
    inputs: [{ name: "raffleId", type: "uint256" }],
    outputs: [
      {
        name: "raffle",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "prizePool", type: "uint256" },
          { name: "ticketPrice", type: "uint256" },
          { name: "participants", type: "uint256" },
          { name: "maxParticipants", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "winner", type: "address" }
        ]
      }
    ]
  },
  {
    type: "function",
    name: "getParticipants",
    stateMutability: "view",
    inputs: [{ name: "raffleId", type: "uint256" }],
    outputs: [{ name: "participants", type: "address[]" }]
  },
  {
    type: "function",
    name: "getUserTickets",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "tickets",
        type: "tuple[]",
        components: [
          { name: "raffleId", type: "uint256" },
          { name: "tickets", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "isWinner", type: "bool" }
        ]
      }
    ]
  },
  {
    type: "function",
    name: "enterRaffle",
    stateMutability: "payable",
    inputs: [
      { name: "raffleId", type: "uint256" },
      { name: "ticketCount", type: "uint256" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "createRaffle",
    stateMutability: "payable",
    inputs: [
      { name: "ticketPrice", type: "uint256" },
      { name: "maxParticipants", type: "uint256" },
      { name: "duration", type: "uint256" }
    ],
    outputs: []
  }
] as const;

const chainMap = {
  1: mainnet,
  11155111: sepolia
};

function getPublicClient(chainId?: number) {
  const chain = chainId && chainMap[chainId as keyof typeof chainMap];
  return createPublicClient({
    chain: chain ?? sepolia,
    transport: http()
  });
}

function getContractAddress(chainId?: number) {
  if (chainId === 1) {
    return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET as Address | undefined;
  }
  if (chainId === 11155111) {
    return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA as Address | undefined;
  }
  return undefined;
}

function statusFromIndex(status: number) {
  if (status === 1) return "Drawing";
  if (status === 2) return "Completed";
  return "Active";
}

function mapRaffle(raw: any): Raffle {
  const id = raw?.id ?? raw?.[0] ?? 0n;
  const prizePool = raw?.prizePool ?? raw?.[1] ?? 0n;
  const ticketPrice = raw?.ticketPrice ?? raw?.[2] ?? 0n;
  const participants = raw?.participants ?? raw?.[3] ?? 0n;
  const maxParticipants = raw?.maxParticipants ?? raw?.[4] ?? 0n;
  const endTime = raw?.endTime ?? raw?.[5] ?? 0n;
  const status = raw?.status ?? raw?.[6] ?? 0;
  const winner = raw?.winner ?? raw?.[7] ?? null;

  return {
    id: String(id),
    prizePool: (Number(prizePool) / 1e18).toFixed(2),
    ticketPrice: (Number(ticketPrice) / 1e18).toFixed(3),
    participants: Number(participants),
    maxParticipants: Number(maxParticipants),
    endsAt: Number(endTime),
    status: statusFromIndex(Number(status)),
    winner
  };
}

export async function getRaffles({
  chainId,
  useMock
}: {
  chainId?: number;
  useMock?: boolean;
}) {
  const address = getContractAddress(chainId);
  if (useMock || !address) {
    return getMockRaffles();
  }

  try {
    const client = getPublicClient(chainId);
    const raffles = await client.readContract({
      address,
      abi: raffleAbi,
      functionName: "getRaffles"
    });
    return (raffles as any[]).map(mapRaffle);
  } catch {
    return getMockRaffles();
  }
}

export async function getRaffle({
  chainId,
  raffleId,
  useMock
}: {
  chainId?: number;
  raffleId: string;
  useMock?: boolean;
}) {
  const address = getContractAddress(chainId);
  if (useMock || !address) {
    return getMockRaffle(raffleId);
  }

  try {
    const client = getPublicClient(chainId);
    const raffle = await client.readContract({
      address,
      abi: raffleAbi,
      functionName: "getRaffle",
      args: [BigInt(raffleId)]
    });
    return mapRaffle(raffle);
  } catch {
    return getMockRaffle(raffleId);
  }
}

export async function getParticipants({
  chainId,
  raffleId,
  useMock
}: {
  chainId?: number;
  raffleId: string;
  useMock?: boolean;
}) {
  const address = getContractAddress(chainId);
  if (useMock || !address) {
    return getMockParticipants(raffleId);
  }

  try {
    const client = getPublicClient(chainId);
    return (await client.readContract({
      address,
      abi: raffleAbi,
      functionName: "getParticipants",
      args: [BigInt(raffleId)]
    })) as Address[];
  } catch {
    return getMockParticipants(raffleId);
  }
}

export async function getUserTickets({
  chainId,
  address,
  useMock
}: {
  chainId?: number;
  address?: Address;
  useMock?: boolean;
}) {
  const contractAddress = getContractAddress(chainId);
  if (useMock || !contractAddress || !address) {
    return getMockUserTickets(address);
  }

  try {
    const client = getPublicClient(chainId);
    return await client.readContract({
      address: contractAddress,
      abi: raffleAbi,
      functionName: "getUserTickets",
      args: [address]
    });
  } catch {
    return getMockUserTickets(address);
  }
}

export async function getWinners({ useMock }: { useMock?: boolean }) {
  return getMockWinners();
}

export async function enterRaffle({
  chainId,
  raffleId,
  ticketCount,
  totalCost,
  walletClient,
  address,
  useMock
}: {
  chainId?: number;
  raffleId: string;
  ticketCount: number;
  totalCost: string;
  walletClient?: WalletClient;
  address?: Address;
  useMock?: boolean;
}) {
  const contractAddress = getContractAddress(chainId);
  if (useMock || !contractAddress || !walletClient || !address) {
    if (!address) throw new Error("Wallet not connected.");
    return enterMockRaffle({ raffleId, ticketCount, address });
  }

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: raffleAbi,
    functionName: "enterRaffle",
    args: [BigInt(raffleId), BigInt(ticketCount)],
    value: parseEther(totalCost)
  });

  return { txHash: hash };
}

export async function createRaffle({
  chainId,
  ticketPrice,
  maxParticipants,
  duration,
  prizeAmount,
  walletClient,
  address,
  useMock
}: {
  chainId?: number;
  ticketPrice: string;
  maxParticipants: number;
  duration: number;
  prizeAmount: string;
  walletClient?: WalletClient;
  address?: Address;
  useMock?: boolean;
}) {
  const contractAddress = getContractAddress(chainId);
  if (useMock || !contractAddress || !walletClient || !address) {
    return createMockRaffle({ ticketPrice, maxParticipants, duration, prizeAmount });
  }

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: raffleAbi,
    functionName: "createRaffle",
    args: [parseEther(ticketPrice), BigInt(maxParticipants), BigInt(duration)],
    value: parseEther(prizeAmount)
  });

  return { txHash: hash };
}
