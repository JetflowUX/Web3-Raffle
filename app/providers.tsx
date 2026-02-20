"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { Toaster } from "sonner";

import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "ChainRaffle",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "chainraffle-demo",
  chains: [mainnet, sepolia],
  ssr: true
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 10,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#1fff20",
            accentColorForeground: "#000000",
            borderRadius: "medium",
            overlayBlur: "small"
          })}
        >
          {children}
          <Toaster richColors position="top-right" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
