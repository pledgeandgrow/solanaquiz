'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';

export const WalletConnectButton: FC = () => {
  const { publicKey } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
    } else {
      setWalletAddress('');
    }
  }, [publicKey]);

  return (
    <div className="wallet-connect-container">
      {/* Use the WalletMultiButton from the wallet adapter UI */}
      <WalletMultiButton className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg px-6 py-3 font-semibold text-white hover:opacity-90 transition-all" />
      
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
