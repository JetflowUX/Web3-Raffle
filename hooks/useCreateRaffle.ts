"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useChainId, useWalletClient } from "wagmi";

import { createRaffle } from "../lib/contract";
import { useMockMode } from "./useMockMode";

export function useCreateRaffle() {
  const chainId = useChainId();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { useMock } = useMockMode();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      ticketPrice,
      maxParticipants,
      duration,
      prizeAmount
    }: {
      ticketPrice: string;
      maxParticipants: number;
      duration: number;
      prizeAmount: string;
    }) => {
      return createRaffle({
        chainId,
        ticketPrice,
        maxParticipants,
        duration,
        prizeAmount,
        walletClient: walletClient ?? undefined,
        address: address ?? undefined,
        useMock
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raffles"] });
    }
  });

  return mutation;
}
