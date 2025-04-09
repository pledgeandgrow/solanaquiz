'use client';

import { useState, FormEvent } from 'react';
import { useQuizContract, GameDetails } from '../../lib/solana/quiz-contract';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

export default function QuizGameContract() {
  const { publicKey } = useWallet();
  const { initializeGame, getGameDetails, isWalletConnected } = useQuizContract();
  
  const [opponentAddress, setOpponentAddress] = useState('');
  const [betAmount, setBetAmount] = useState(0.1);
  const [gameAccount, setGameAccount] = useState('');
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInitializeGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate opponent address
      const opponentPublicKey = new PublicKey(opponentAddress);
      
      // Initialize the game
      const result = await initializeGame(opponentPublicKey, betAmount);
      
      if (result.success) {
        setGameAccount(result.data.gameAccountPublicKey);
        setSuccess(`Game initialized successfully! Game ID: ${result.data.gameAccountPublicKey}`);
      } else {
        setError(result.error || 'Failed to initialize game');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid opponent address or other error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGetGameDetails = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await getGameDetails(gameAccount);
      
      if (result.success) {
        setGameDetails(result.data);
      } else {
        setError(result.error || 'Failed to fetch game details');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error occurred while fetching game details');
    } finally {
      setLoading(false);
    }
  };

  if (!isWalletConnected) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
        <p className="text-gray-300 mb-4">
          Please connect your Solana wallet to create or join a quiz game.
        </p>
        <div className="flex justify-center">
          <button 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            disabled
          >
            Wallet Not Connected
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">Create a Quiz Game</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
          {success}
        </div>
      )}
      
      <form onSubmit={handleInitializeGame} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Opponent Wallet Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={opponentAddress}
            onChange={(e) => setOpponentAddress(e.target.value)}
            placeholder="Enter Solana wallet address"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Bet Amount (SOL)</label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? 'Creating Game...' : 'Create Quiz Game'}
        </button>
      </form>
      
      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-semibold mb-4">Check Game Status</h4>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Game Account ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={gameAccount}
            onChange={(e) => setGameAccount(e.target.value)}
            placeholder="Enter game account ID"
          />
        </div>
        
        <button
          onClick={handleGetGameDetails}
          className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors mb-4"
          disabled={loading || !gameAccount}
        >
          {loading ? 'Loading...' : 'Get Game Details'}
        </button>
        
        {gameDetails && (
          <div className="p-4 bg-gray-700/50 rounded-lg">
            <h5 className="font-semibold mb-2">Game Details</h5>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">Player 1:</span> {gameDetails.playerOne}</li>
              <li><span className="text-gray-400">Player 2:</span> {gameDetails.playerTwo}</li>
              <li><span className="text-gray-400">Bet Amount:</span> {gameDetails.betAmount} SOL</li>
              <li><span className="text-gray-400">Status:</span> {gameDetails.status}</li>
              <li><span className="text-gray-400">Winner:</span> {gameDetails.winner || 'Not determined yet'}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
