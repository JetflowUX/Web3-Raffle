import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEth(amount: string): string {
  return `${amount} ETH`;
}

export function getTimeRemaining(endTime: Date) {
  const total =
  Date.parse(endTime.toString()) - Date.parse(new Date().toString());
  const seconds = Math.floor(total / 1000 % 60);
  const minutes = Math.floor(total / 1000 / 60 % 60);
  const hours = Math.floor(total / (1000 * 60 * 60) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

export function formatTimeRemaining(endTime: Date): string {
  const { total, days, hours, minutes } = getTimeRemaining(endTime);
  if (total <= 0) return 'Ended';

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export function generateTxHash(): string {
  return (
    '0x' +
    Array(64).
    fill(0).
    map(() => Math.floor(Math.random() * 16).toString(16)).
    join(''));

}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function getExplorerUrl(txHash: string): string {
  return `https://etherscan.io/tx/${txHash}`;
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};