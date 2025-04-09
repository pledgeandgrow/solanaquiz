'use client';

import { useState } from 'react';
import WalletModal from './WalletModal';

interface WalletModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModalWrapper({ isOpen, onClose }: WalletModalWrapperProps) {
  const handleConnect = (walletAddress: string) => {
    console.log('Wallet connected:', walletAddress);
    // Here you could call an API to register the user or update their profile
  };
  
  return (
    <WalletModal 
      isOpen={isOpen} 
      onClose={onClose} 
      onConnect={handleConnect}
    />
  );
}
