"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Copy, LogOut, Wallet2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useDisconnect } from "wagmi";

import { Button } from "./ui/button";
import { formatAddress } from "../lib/utils";

interface WalletButtonProps {
  isMobile?: boolean;
}

export function WalletButton({ isMobile = false }: WalletButtonProps) {
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        if (!connected) {
          return (
            <Button onClick={openConnectModal} size={isMobile ? "md" : "sm"} className={isMobile ? "w-full" : ""}>
              <Wallet2 className="h-4 w-4" />
              Connect Wallet
            </Button>
          );
        }

        const copyAddress = async () => {
          if (!account?.address) return;
          await navigator.clipboard.writeText(account.address);
          toast.success("Address copied.");
        };

        // Mobile layout - stacked buttons
        if (isMobile) {
          return (
            <div className="flex flex-col gap-2 w-full">
              <Button 
                variant="secondary" 
                size="md" 
                onClick={openChainModal}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{chain?.name}</span>
                </span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={openAccountModal}
                  className="flex-1 justify-start text-xs"
                >
                  {formatAddress(account?.address)}
                </Button>
                <Button 
                  variant="ghost" 
                  size="md" 
                  onClick={copyAddress}
                  className="px-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="md" 
                  onClick={() => disconnect()}
                  className="px-2"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        }

        // Desktop layout - horizontal buttons
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={openChainModal}>
              {chain?.name}
            </Button>
            <Button variant="secondary" size="sm" onClick={openAccountModal}>
              {formatAddress(account?.address)}
              <span className="hidden text-xs text-background/70 md:inline">
                {account?.displayBalance}
              </span>
            </Button>
            <Button variant="ghost" size="sm" onClick={copyAddress}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => disconnect()}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
