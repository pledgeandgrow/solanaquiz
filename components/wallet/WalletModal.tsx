'use client';

import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import Image from 'next/image';
import { useUserAuth } from '../../lib/contexts/UserAuthContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (walletAddress: string) => void;
}

const WalletModal = ({ isOpen, onClose, onConnect }: WalletModalProps) => {
  const { wallets, select, connect, connected, publicKey, disconnect, connecting } = useWallet();
  const { registerUser, isLoading: isAuthLoading } = useUserAuth();
  const [selectedWallet, setSelectedWallet] = useState<WalletName | null>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [step, setStep] = useState<'select-wallet' | 'user-info' | 'connecting'>('select-wallet');
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setStep('select-wallet');
      setSelectedWallet(null);
      setError(null);
    }
  }, [isOpen]);

  // Handle wallet connection success
  useEffect(() => {
    const handleConnectionSuccess = async () => {
      if (connected && publicKey && step === 'connecting') {
        try {
          // Only try to register if we have user info
          if (email && username) {
            await registerUser(email, username);
            console.log('User registered successfully');
          }
          
          if (onConnect) {
            onConnect(publicKey.toString());
          }
          
          // Close the modal after successful connection
          onClose();
        } catch (err) {
          console.error('Error during post-connection process:', err);
          setError(err instanceof Error ? err.message : 'Error completing registration');
          setStep('user-info');
        }
      }
    };

    handleConnectionSuccess();
  }, [connected, publicKey, step, email, username, onConnect, onClose, registerUser]);

  // Filter wallets to only show installed or loadable ones
  const availableWallets = wallets.filter(wallet => 
    wallet.readyState === WalletReadyState.Installed || 
    wallet.readyState === WalletReadyState.Loadable
  );

  // Handle wallet selection
  const handleWalletSelect = async (walletName: WalletName) => {
    try {
      setSelectedWallet(walletName);
      select(walletName);
      
      // Check if the wallet requires user info before connecting
      // For this example, we'll always collect user info
      setStep('user-info');
    } catch (err) {
      console.error('Error selecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to select wallet');
    }
  };

  // Handle direct connection (without user info)
  const handleDirectConnect = async (walletName: WalletName) => {
    try {
      setSelectedWallet(walletName);
      select(walletName);
      setStep('connecting');
      
      // Attempt to connect the wallet directly
      await connect();
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      setStep('select-wallet');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!selectedWallet) {
      setError('Please select a wallet');
      return;
    }
    
    try {
      setStep('connecting');
      setError(null);
      
      // Attempt to connect the wallet
      await connect();
      
      // Note: The connection success effect will handle registration
      // if the connection is successful
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      setStep('user-info');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {step === 'select-wallet' ? 'Connect Wallet' : 
               step === 'user-info' ? 'Complete Your Profile' : 
               'Connecting...'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {step === 'select-wallet' && (
            <div className="space-y-4">
              <p className="text-gray-300 mb-4">
                Connect your Solana wallet to access all features of SolanaFlow.
              </p>
              
              {availableWallets.length > 0 ? (
                <div className="space-y-2">
                  {availableWallets.map((wallet) => (
                    <button
                      key={wallet.adapter.name}
                      onClick={() => handleWalletSelect(wallet.adapter.name)}
                      className="flex items-center justify-between w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        {wallet.adapter.icon && (
                          <Image 
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            width={32}
                            height={32}
                            className="mr-3"
                          />
                        )}
                        <span className="font-medium">{wallet.adapter.name}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400 mb-4">No Solana wallets detected</p>
                  <p className="text-sm text-gray-500">
                    Please install a Solana wallet extension like{' '}
                    <a 
                      href="https://phantom.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Phantom
                    </a>
                    {' '}or{' '}
                    <a 
                      href="https://solflare.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Solflare
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 'user-info' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Choose a username"
                  required
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAuthLoading || connecting}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50"
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setStep('select-wallet')}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  ← Back to wallet selection
                </button>
              </div>
            </form>
          )}

          {step === 'connecting' && (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-300">Connecting to {selectedWallet}...</p>
              <p className="text-gray-400 text-sm mt-2">Please approve the connection in your wallet</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-800/50 px-6 py-4 text-xs text-gray-400">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
