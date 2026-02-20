"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useChainId, useWalletClient } from "wagmi";

import { enterRaffle } from "../lib/contract";
import { useMockMode } from "./useMockMode";

export function useEnterRaffle() {
  const chainId = useChainId();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { useMock } = useMockMode();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      raffleId,
      ticketCount,
      totalCost
    }: {
      raffleId: string;
      ticketCount: number;
      totalCost: string;
    }) => {
      if (!address) {
        throw new Error("Wallet not connected.");
      }
      return enterRaffle({
        chainId,
        raffleId,
        ticketCount,
        totalCost,
        walletClient: walletClient ?? undefined,
        address,
        useMock
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raffles"] });
      queryClient.invalidateQueries({ queryKey: ["raffle"] });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });

  return mutation;
}
