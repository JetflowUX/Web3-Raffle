import React from 'react';
import { Winner } from '../lib/types';
import { Card } from './ui/Card';
import {
  formatAddress,
  formatEth,
  formatDate,
  getExplorerUrl } from
'../lib/utils';
import { Trophy, ExternalLink, Calendar } from 'lucide-react';
export function WinnerCard({ winner }: {winner: Winner;}) {
  return (
    <Card className="p-5 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
          <Trophy className="h-6 w-6 text-yellow-500" />
        </div>
        <div>
          <h4 className="text-white font-medium">
            {formatAddress(winner.address)}
          </h4>
          <p className="text-sm text-gray-400">
            Won {formatEth(winner.prizeAmount)} in {winner.raffleTitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          {formatDate(winner.date)}
        </div>
        <a
          href={getExplorerUrl(winner.txHash)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">

          View TX <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </Card>);

}