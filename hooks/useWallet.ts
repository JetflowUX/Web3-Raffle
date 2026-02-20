"use client";

import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const balance = useBalance({ address, chainId, query: { enabled: Boolean(address) } });

  return {
    address,
    chainId,
    isConnected,
    disconnect,
    balance: balance.data?.formatted,
    balanceSymbol: balance.data?.symbol
  };
}
