'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';

export const WalletConnectButton: FC = () => {
  const { publicKey, wallet, disconnect } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
    } else {
      setWalletAddress('');
    }
  }, [publicKey]);

  // Custom styling to match our app's design
  const buttonStyle = {
    background: 'linear-gradient(to right, #9945FF, #14F195)',
    borderRadius: '0.5rem',
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  return (
    <div className="wallet-connect-container">
      {/* Use the WalletMultiButton from the wallet adapter UI */}
      <WalletMultiButton className="custom-wallet-button" />
      
      {/* Display wallet address if connected */}
      {walletAddress && (
        <div className="mt-2 text-sm text-gray-400">
          Connected: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
