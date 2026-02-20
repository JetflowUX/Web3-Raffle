"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Copy, LogOut, Wallet2 } from "lucide-react";
import { toast } from "sonner";
import { useDisconnect } from "wagmi";

import { Button } from "./ui/button";
import { formatAddress } from "../lib/utils";

export function WalletButton() {
  const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        if (!connected) {
          return (
            <Button onClick={openConnectModal} size="sm">
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
