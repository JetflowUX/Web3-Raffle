"use client";

import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";

import { getRaffles } from "../lib/contract";
import { useMockMode } from "./useMockMode";

export function useRaffles() {
  const chainId = useChainId();
  const { useMock } = useMockMode();

  return useQuery({
    queryKey: ["raffles", chainId, useMock],
    queryFn: () => getRaffles({ chainId, useMock }),
    refetchInterval: 15000
  });
}
