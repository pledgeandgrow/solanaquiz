'use client';

import { useState } from 'react';

// This is a simplified demo component that simulates blockchain interactions
// In a real application, you would use the Solana web3.js library to interact with the blockchain
export default function BlockchainDemo() {
  const [balance, setBalance] = useState<number | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate connecting to a wallet
  const connectWallet = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate async operation
    setTimeout(() => {
      // Generate a fake Solana address
      const fakeAddress = 'So1ana' + Math.random().toString(36).substring(2, 10) + '...';
      setAddress(fakeAddress);
      setBalance(Math.random() * 10); // Random SOL balance between 0 and 10
      setIsConnected(true);
      setIsLoading(false);
    }, 1000);
  };

  // Simulate disconnecting from wallet
  const disconnectWallet = () => {
    setIsLoading(true);
    
    // Simulate async operation
    setTimeout(() => {
      setAddress('');
      setBalance(null);
      setIsConnected(false);
      setIsLoading(false);
    }, 500);
  };

  // Simulate sending a transaction
  const sendTransaction = () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate async operation
    setTimeout(() => {
      // 10% chance of transaction failure for demo purposes
      if (Math.random() < 0.1) {
        setError('Transaction failed. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Simulate spending between 0.01 and 0.1 SOL
      const amount = Math.random() * 0.09 + 0.01;
      setBalance(prev => prev ? Math.max(0, prev - amount) : 0);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">Solana Blockchain Demo</h3>
      
      {isConnected ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-700/50">
            <p className="text-sm text-gray-400">Connected Address</p>
            <p className="font-mono text-purple-400">{address}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-700/50">
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-2xl font-bold">{balance?.toFixed(4)} <span className="text-purple-400">SOL</span></p>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={sendTransaction}
              disabled={isLoading}
              className="flex-1 rounded-lg bg-purple-600 px-4 py-2 font-medium transition-all hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Send Transaction'}
            </button>
            
            <button 
              onClick={disconnectWallet}
              disabled={isLoading}
              className="rounded-lg border border-purple-500 bg-transparent px-4 py-2 font-medium transition-all hover:bg-purple-500/10 disabled:opacity-50"
            >
              Disconnect
            </button>
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 text-red-200">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-400">Connect your wallet to interact with the Solana blockchain</p>
          
          <button 
            onClick={connectWallet}
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 font-medium transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          
          {error && (
            <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 text-red-200">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
