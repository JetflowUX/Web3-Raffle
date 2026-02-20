import { Blockchain } from "./types";
import { 
  EthereumIcon, 
  SolanaIcon, 
  PolkadotIcon, 
  CardanoIcon, 
  AptosIcon, 
  AvalancheIcon 
} from "../components/BlockchainIcons";
import React from "react";

export interface BlockchainConfig {
  name: Blockchain;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bgColor: string;
  borderColor: string;
  currency: string;
  gradient: string;
}

export const blockchainConfigs: Record<Blockchain, BlockchainConfig> = {
  Ethereum: {
    name: "Ethereum",
    icon: EthereumIcon,
    color: "#627EEA",
    bgColor: "bg-[#627EEA]/20",
    borderColor: "border-[#627EEA]/30",
    currency: "ETH",
    gradient: "from-[#627EEA] to-[#8A9EFF]"
  },
  Solana: {
    name: "Solana",
    icon: SolanaIcon,
    color: "#14F195",
    bgColor: "bg-[#14F195]/20",
    borderColor: "border-[#14F195]/30",
    currency: "SOL",
    gradient: "from-[#14F195] to-[#9945FF]"
  },
  Polkadot: {
    name: "Polkadot",
    icon: PolkadotIcon,
    color: "#E6007A",
    bgColor: "bg-[#E6007A]/20",
    borderColor: "border-[#E6007A]/30",
    currency: "DOT",
    gradient: "from-[#E6007A] to-[#FF4D9D]"
  },
  Cardano: {
    name: "Cardano",
    icon: CardanoIcon,
    color: "#0033AD",
    bgColor: "bg-[#0033AD]/20",
    borderColor: "border-[#0033AD]/30",
    currency: "ADA",
    gradient: "from-[#0033AD] to-[#1A56DB]"
  },
  Aptos: {
    name: "Aptos",
    icon: AptosIcon,
    color: "#00E5CC",
    bgColor: "bg-[#00E5CC]/20",
    borderColor: "border-[#00E5CC]/30",
    currency: "APT",
    gradient: "from-[#00E5CC] to-[#00FFE0]"
  },
  Avalanche: {
    name: "Avalanche",
    icon: AvalancheIcon,
    color: "#E84142",
    bgColor: "bg-[#E84142]/20",
    borderColor: "border-[#E84142]/30",
    currency: "AVAX",
    gradient: "from-[#E84142] to-[#FF5A5B]"
  }
};

export const allBlockchains: Blockchain[] = [
  "Ethereum",
  "Solana",
  "Polkadot",
  "Cardano",
  "Aptos",
  "Avalanche"
];

export function getBlockchainConfig(blockchain: Blockchain): BlockchainConfig {
  return blockchainConfigs[blockchain];
}
