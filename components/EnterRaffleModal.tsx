"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2, ExternalLink, CheckCircle2 } from "lucide-react";
import { useChainId } from "wagmi";

import type { Raffle } from "../lib/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useEnterRaffle } from "../hooks/useEnterRaffle";
import { clampNumber, formatToken, getExplorerTxUrl } from "../lib/utils";
import { useWallet } from "../hooks/useWallet";
import { getBlockchainConfig } from "../lib/blockchainConfig";

export function EnterRaffleModal({ raffle }: { raffle: Raffle }) {
  const [open, setOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { isConnected } = useWallet();
  const enterMutation = useEnterRaffle();
  const chainId = useChainId();
  const blockchainConfig = getBlockchainConfig(raffle.blockchain);

  const totalCost = useMemo(() => {
    return Number(raffle.ticketPrice) * ticketCount;
  }, [raffle.ticketPrice, ticketCount]);

  const handleSubmit = async () => {
    try {
      toast.loading("Preparing transaction...", { id: "enter-raffle" });
      
      const result = await enterMutation.mutateAsync({
        raffleId: raffle.id,
        ticketCount,
        totalCost: totalCost.toString()
      });
      
      setTxHash(result?.txHash ?? null);
      toast.success("Successfully entered raffle!", { id: "enter-raffle" });
      setTicketCount(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed.";
      toast.error(message, { id: "enter-raffle" });
    }
  };

  const resetModal = () => {
    setTxHash(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-primary text-black hover:bg-primary/90 font-semibold" 
          size="md"
          disabled={raffle.status !== "Active"}
        >
          Enter Raffle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Enter Raffle #{raffle.id}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Purchase tickets on {raffle.blockchain} to enter this raffle.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 sm:space-y-4">
          <div>
            <label className="text-xs sm:text-sm text-muted mb-2 block">Number of Tickets</label>
            <Input
              type="number"
              min={1}
              max={99}
              value={ticketCount}
              onChange={(event) =>
                setTicketCount(clampNumber(Number(event.target.value), 1, 99))
              }
              className="text-sm"
            />
          </div>
          
          <div className="rounded-lg bg-card border border-border p-3 sm:p-4 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted">Price per ticket</span>
              <span className="text-white font-semibold">{formatToken(Number(raffle.ticketPrice))} {blockchainConfig.currency}</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted">Tickets</span>
              <span className="text-white font-semibold">×{ticketCount}</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-xs sm:text-sm">Total cost</span>
              <span className="text-primary text-base sm:text-lg font-bold">{formatToken(totalCost)} {blockchainConfig.currency}</span>
            </div>
          </div>
          
          {!isConnected && (
            <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-accent/10 border border-accent/30">
              <span className="text-xs text-accent">⚠️ Connect your wallet to enter this raffle</span>
            </div>
          )}
        </div>

        {txHash ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/30">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Entry successful!</p>
                <p className="text-xs text-muted mt-1">Your tickets have been purchased</p>
              </div>
            </div>
            <a
              href={getExplorerTxUrl(txHash, chainId)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View transaction <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button className="w-full bg-primary text-black hover:bg-primary/90" onClick={resetModal}>
              Done
            </Button>
          </div>
        ) : (
          <Button
            className="mt-6 w-full bg-primary text-black hover:bg-primary/90 font-semibold text-sm sm:text-base py-2"
            onClick={handleSubmit}
            disabled={!isConnected || enterMutation.isPending}
          >
            {enterMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Confirming...
              </span>
            ) : (
              `Enter Raffle (${formatToken(totalCost)} ${blockchainConfig.currency})`
            )}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
