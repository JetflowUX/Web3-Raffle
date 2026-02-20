import React, { Fragment } from 'react';
import { useWallet } from '../context/WalletContext';
import { Button } from './ui/Button';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { formatAddress, formatEth } from '../lib/utils';
import { Menu, Transition } from '@headlessui/react';
export function WalletButton({ className }: {className?: string;}) {
  const { isConnected, address, balance, connect, disconnect, isConnecting } =
  useWallet();
  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        isLoading={isConnecting}
        leftIcon={<Wallet className="h-4 w-4" />}
        className={className}>

        Connect Wallet
      </Button>);

  }
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button as={Fragment}>
        <button className="inline-flex items-center gap-3 bg-[#111827] border border-gray-700 hover:border-gray-600 rounded-xl px-4 py-2 transition-all duration-200 group">
          <div className="flex flex-col items-end mr-1">
            <span className="text-xs text-gray-400 font-medium">
              {formatEth(balance)}
            </span>
            <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              {formatAddress(address!)}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/20">
            {address?.slice(2, 4).toUpperCase()}
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
        </button>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">

        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-xl bg-[#1F2937] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3">
            <p className="text-sm text-white">Connected with MetaMask</p>
            <p className="text-xs text-gray-400 truncate mt-1">{address}</p>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) =>
              <button
                onClick={disconnect}
                className={`${active ? 'bg-red-500/10 text-red-400' : 'text-gray-300'} group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}>

                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Disconnect
                </button>
              }
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>);

}