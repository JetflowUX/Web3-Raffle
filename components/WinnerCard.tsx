import type { WinnerRecord } from "../lib/types";
import { formatAddress, formatDateTime } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function WinnerCard({ winner }: { winner: WinnerRecord }) {
  return (
    <Card className="glass-card">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">Raffle #{winner.raffleId}</p>
          <Badge className="border-accent/40 text-accent">Winner</Badge>
        </div>
        <div>
          <p className="text-xs text-muted">Wallet</p>
          <p className="text-sm text-text">{formatAddress(winner.winner)}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Prize</span>
          <span className="text-text">{winner.prize} ETH</span>
        </div>
        <p className="text-xs text-muted">{formatDateTime(Date.parse(winner.date) / 1000)}</p>
      </CardContent>
    </Card>
  );
}
