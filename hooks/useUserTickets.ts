"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";

import { getUserTickets } from "../lib/contract";
import type { UserTicketSummary } from "../lib/types";
import { useMockMode } from "./useMockMode";

export function useUserTickets() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { useMock } = useMockMode();

  return useQuery<UserTicketSummary[]>({
    queryKey: ["tickets", chainId, address, useMock],
    queryFn: () => getUserTickets({ chainId, address: address ?? undefined, useMock }),
    enabled: Boolean(address) || useMock
  });
}
