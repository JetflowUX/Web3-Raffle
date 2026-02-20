"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

import { getUserTickets } from "../lib/contract";
import { useMockMode } from "./useMockMode";

export function useUserTickets() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { useMock } = useMockMode();

  return useQuery({
    queryKey: ["tickets", chainId, address, useMock],
    queryFn: () => getUserTickets({ chainId, address: address ?? undefined, useMock }),
    enabled: Boolean(address) || useMock
  });
}
