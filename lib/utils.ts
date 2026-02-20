import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatEther } from "ethers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address?: string | null) {
  if (!address) return "-";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatToken(value: string | number, decimals = 4) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numeric)) return "0";
  return numeric.toFixed(decimals);
}

export function formatWei(wei: bigint | string) {
  try {
    const value = typeof wei === "string" ? BigInt(wei) : wei;
    return formatEther(value);
  } catch {
    return "0";
  }
}

export function formatDateTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function getTimeRemaining(endsAt: number) {
  const now = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, endsAt - now);
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  return { diff, days, hours, minutes, seconds };
}

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function getExplorerTxUrl(txHash?: string, chainId?: number) {
  if (!txHash) return "";
  const base = chainId === 1 ? "https://etherscan.io" : "https://sepolia.etherscan.io";
  return `${base}/tx/${txHash}`;
}
