'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserAuth } from '../../lib/contexts/UserAuthContext';
import solanaService from '../../lib/services/solanaService';

export default function UserDashboard() {
  const { publicKey } = useWallet();
  const { userProfile, isAuthenticated, logout } = useUserAuth();
  const [isCopied, setIsCopied] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [airdropRequested, setAirdropRequested] = useState(false);

  // Copy wallet address to clipboard
  const copyToClipboard = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toString());
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await logout();
  };

  // Request SOL airdrop (only works on devnet)
  const requestAirdrop = async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    try {
      await solanaService.requestAirdrop(publicKey.toString());
      // Refresh balance after airdrop
      const newBalance = await solanaService.getWalletBalance(publicKey.toString());
      setBalance(newBalance);
      setAirdropRequested(true);
      
      // Reset airdrop requested state after 5 seconds
      setTimeout(() => {
        setAirdropRequested(false);
      }, 5000);
    } catch (error) {
      console.error('Error requesting airdrop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        setIsLoading(true);
        try {
          const walletBalance = await solanaService.getWalletBalance(publicKey.toString());
          setBalance(walletBalance);
        } catch (error) {
          console.error('Error fetching balance:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBalance();
    
    // Set up interval to refresh balance every 30 seconds
    const intervalId = setInterval(fetchBalance, 30000);
    
    return () => clearInterval(intervalId);
  }, [publicKey]);

  if (!isAuthenticated || !userProfile) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md mx-auto">
        <div className="text-center py-8">
          <p className="text-gray-400">Please connect your wallet to view your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6">
        <h2 className="text-2xl font-bold text-white mb-1">Your Dashboard</h2>
        <p className="text-purple-200">Manage your wallet and profile</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* User Profile Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Profile Information</h3>
          
          <div className="flex items-start space-x-4">
            <div className="bg-purple-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
              {userProfile.username.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <p className="font-medium text-white">{userProfile.username}</p>
              <p className="text-gray-400 text-sm">{userProfile.email}</p>
            </div>
          </div>
        </div>
        
        {/* Wallet Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Wallet Information</h3>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Connected Wallet</span>
              <button 
                onClick={copyToClipboard}
                className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
              >
                {isCopied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <p className="font-mono text-white break-all">{publicKey?.toString()}</p>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Balance: <span className="text-white font-medium">
                  {isLoading ? 'Loading...' : balance !== null ? solanaService.formatSol(balance) : 'N/A'}
                </span>
              </span>
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Solana Devnet
              </span>
            </div>
            
            {/* Airdrop button (only for devnet) */}
            <div className="mt-4">
              <button
                onClick={requestAirdrop}
                disabled={isLoading || airdropRequested}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50 text-sm"
              >
                {isLoading ? 'Processing...' : airdropRequested ? 'Airdrop Successful!' : 'Request 1 SOL Airdrop (Devnet)'}
              </button>
              <p className="text-xs text-gray-400 mt-1 text-center">
                This only works on Solana Devnet for testing
              </p>
            </div>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
