'use client';

import { useEffect, useState } from 'react';
import QuizGameContract from '../../components/quiz/QuizGameContract';
import WalletConnectionProvider from '../../components/wallet/WalletConnectionProvider';

export default function ClientWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  // This ensures the component only renders on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">Loading Wallet Integration...</h3>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WalletConnectionProvider>
      <div>
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
            Bet on Your Knowledge
          </span>
        </h2>
        <p className="text-gray-300 mb-6">
          Challenge your friends to a quiz duel and bet SOL on who knows more about blockchain. 
          All bets are secured by our Solana smart contract.
        </p>
        <QuizGameContract />
      </div>
    </WalletConnectionProvider>
  );
}
