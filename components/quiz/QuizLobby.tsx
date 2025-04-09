'use client';

import { useState } from 'react';
import Image from 'next/image';

interface QuizLobbyProps {
  onStartQuiz: () => void;
}

export default function QuizLobby({ onStartQuiz }: QuizLobbyProps) {
  const [selectedCategory, setSelectedCategory] = useState('blockchain');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleStartQuiz = () => {
    setIsSearching(true);
    // Simulate finding an opponent
    setTimeout(() => {
      onStartQuiz();
    }, 3000);
  };
  
  const categories = [
    { id: 'blockchain', name: 'Blockchain Basics', icon: '🔗' },
    { id: 'solana', name: 'Solana Ecosystem', icon: '☀️' },
    { id: 'defi', name: 'DeFi Knowledge', icon: '💰' },
    { id: 'nft', name: 'NFT & Digital Assets', icon: '🖼️' },
  ];
  
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Quiz Challenge</h2>
        <p className="text-gray-400">
          Challenge your knowledge of blockchain and win the quiz!
        </p>
      </div>
      
      {!isSearching ? (
        <div className="space-y-8">
          {/* Category Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-300">Select Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCategory === category.id 
                      ? 'border-purple-500 bg-purple-900/30' 
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Start Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleStartQuiz}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg font-semibold text-lg hover:opacity-90 transition-all"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin mb-4">
            <svg className="w-16 h-16 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Preparing your quiz...</h3>
          <p className="text-gray-400">This won't take long</p>
        </div>
      )}
    </div>
  );
}
