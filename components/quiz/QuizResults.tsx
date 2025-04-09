'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface QuizResultsProps {
  score: number;
  opponentScore: number;
  onPlayAgain: () => void;
}

export default function QuizResults({ score, opponentScore, onPlayAgain }: QuizResultsProps) {
  const [isCollecting, setIsCollecting] = useState(false);
  const [isRewardCollected, setIsRewardCollected] = useState(false);
  
  const hasWon = score > opponentScore;
  const isDraw = score === opponentScore;
  
  // Calculate reward amount (this would be based on actual bet in a real app)
  const rewardAmount = hasWon ? 0.25 : 0;
  
  const handleCollectReward = () => {
    if (!hasWon || isRewardCollected) return;
    
    setIsCollecting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsCollecting(false);
      setIsRewardCollected(true);
    }, 2500);
  };
  
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-gray-400">
          {hasWon 
            ? "Congratulations! You won the quiz challenge!" 
            : isDraw 
              ? "It's a draw! Well played!" 
              : "You lost this round. Better luck next time!"}
        </p>
      </div>
      
      {/* Results Display */}
      <div className="bg-gray-800/70 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Your Score</div>
            <div className="text-3xl font-bold">{score}</div>
          </div>
          
          <div className="px-4 py-2 rounded-lg bg-gray-700/50">
            {hasWon ? (
              <span className="text-green-400 font-semibold">YOU WON</span>
            ) : isDraw ? (
              <span className="text-yellow-400 font-semibold">DRAW</span>
            ) : (
              <span className="text-red-400 font-semibold">YOU LOST</span>
            )}
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Opponent</div>
            <div className="text-3xl font-bold">{opponentScore}</div>
          </div>
        </div>
        
        {/* Reward Section */}
        {hasWon && (
          <div className="border border-purple-500/30 bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-1">You earned a reward!</h3>
                <p className="text-sm text-gray-400">Collect your SOL tokens</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{rewardAmount}</span>
                <span className="text-purple-300">SOL</span>
              </div>
            </div>
            
            <div className="mt-4">
              {!isRewardCollected ? (
                <button
                  onClick={handleCollectReward}
                  disabled={isCollecting}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isCollecting
                      ? 'bg-purple-800/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90'
                  }`}
                >
                  {isCollecting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Transaction...
                    </div>
                  ) : (
                    'Collect Reward'
                  )}
                </button>
              ) : (
                <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-300">Reward collected successfully!</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400 mb-1">Accuracy</div>
          <div className="text-xl font-bold">{Math.round((score / 5) * 100)}%</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400 mb-1">Time Bonus</div>
          <div className="text-xl font-bold">+{score * 10} pts</div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={onPlayAgain}
          className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all"
        >
          Play Again
        </button>
        <button
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Share Results
        </button>
      </div>
    </div>
  );
}
