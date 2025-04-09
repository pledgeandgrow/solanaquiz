'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useUserAuth } from '../../lib/contexts/UserAuthContext';

// Dynamically import the WalletModal component to avoid serialization issues
const WalletModal = dynamic(() => import('./WalletModal'), { ssr: false });

interface WalletButtonProps {
  className?: string;
}

export default function WalletButton({ className = '' }: WalletButtonProps) {
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { logout } = useUserAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  // Handle wallet disconnect
  const handleDisconnect = async () => {
    try {
      setIsDisconnecting(true);
      await disconnect();
      // Also logout from the user auth context
      await logout();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      setIsDisconnecting(false);
    }
  };
  
  // Handle wallet connection
  const handleConnect = (walletAddress: string) => {
    console.log('Wallet connected:', walletAddress);
    setIsModalOpen(false);
  };
  
  return (
    <>
      {connected && publicKey ? (
        <div className="flex items-center space-x-2">
          <span className="hidden md:inline text-sm text-gray-300">
            {formatWalletAddress(publicKey.toString())}
          </span>
          <button 
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className={`rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 font-medium transition-all hover:opacity-90 disabled:opacity-70 ${className}`}
          >
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={connecting}
          className={`rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 font-medium transition-all hover:opacity-90 disabled:opacity-70 ${className}`}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      
      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
      />
    </>
  );
}
