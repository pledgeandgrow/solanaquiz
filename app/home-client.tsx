'use client';

import { useState } from 'react';
import BlockchainDemo from '../components/blockchain/BlockchainDemo';

export default function HomeClient() {
  const [isConnected, setIsConnected] = useState(false);
  
  return {
    BlockchainDemo: <BlockchainDemo />,
    connectWallet: (
      <button 
        onClick={() => setIsConnected(!isConnected)}
        className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 font-medium transition-all hover:opacity-90"
      >
        {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
    )
  };
}
