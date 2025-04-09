'use client';

import WalletModal from './WalletModal';
import { useCallback } from 'react';

interface WalletModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModalWrapper({ isOpen, onClose }: WalletModalWrapperProps) {
  // Using useCallback to ensure the function is memoized
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleConnect = (walletAddress: string) => {
    console.log('Wallet connected:', walletAddress);
    // Here you could call an API to register the user or update their profile
  };
  
  return (
    <WalletModal 
      isOpen={isOpen} 
      onClose={handleClose} 
      onConnect={handleConnect}
    />
  );
}
