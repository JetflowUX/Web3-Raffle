"use client";

import { useQuery } from "@tanstack/react-query";

import { getWinners } from "../lib/contract";
import { useMockMode } from "./useMockMode";

export function useWinners() {
  const { useMock } = useMockMode();

  return useQuery({
    queryKey: ["winners", useMock],
    queryFn: () => getWinners({ useMock }),
    refetchInterval: 20000
  });
}
