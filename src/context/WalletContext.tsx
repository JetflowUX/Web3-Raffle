import React, { useEffect, useState, createContext, useContext } from 'react';
import { WalletState } from '../lib/types';
interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}
const WalletContext = createContext<WalletContextType | undefined>(undefined);
export function WalletProvider({ children }: {children: React.ReactNode;}) {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: '0',
    isConnected: false,
    chainId: 1
  });
  const [isConnecting, setIsConnecting] = useState(false);
  // Check local storage on mount
  useEffect(() => {
    const storedAddress = localStorage.getItem('wallet_address');
    if (storedAddress) {
      setWallet({
        address: storedAddress,
        balance: (Math.random() * 10).toFixed(4),
        isConnected: true,
        chainId: 1
      });
    }
  }, []);
  const connect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    const mockBalance = (Math.random() * 10).toFixed(4);
    setWallet({
      address: mockAddress,
      balance: mockBalance,
      isConnected: true,
      chainId: 1
    });
    localStorage.setItem('wallet_address', mockAddress);
    setIsConnecting(false);
  };
  const disconnect = () => {
    setWallet({
      address: null,
      balance: '0',
      isConnected: false,
      chainId: 1
    });
    localStorage.removeItem('wallet_address');
  };
  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        connect,
        disconnect,
        isConnecting
      }}>

      {children}
    </WalletContext.Provider>);

}
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}