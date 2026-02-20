"use client";

import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";

import { getRaffle, getParticipants } from "../lib/contract";
import { useMockMode } from "./useMockMode";

export function useRaffle(id: string) {
  const chainId = useChainId();
  const { useMock } = useMockMode();

  const raffleQuery = useQuery({
    queryKey: ["raffle", chainId, id, useMock],
    queryFn: () => getRaffle({ chainId, raffleId: id, useMock })
  });

  const participantsQuery = useQuery({
    queryKey: ["participants", chainId, id, useMock],
    queryFn: () => getParticipants({ chainId, raffleId: id, useMock })
  });

  return { raffleQuery, participantsQuery };
}
