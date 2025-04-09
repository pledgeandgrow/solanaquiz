'use client';

import { useState, useEffect } from 'react';
import QuizLobby from './QuizLobby';
import QuizGame from './QuizGame';
import QuizResults from './QuizResults';

// Quiz states
type QuizState = 'lobby' | 'game' | 'results';

export default function QuizContent() {
  const [quizState, setQuizState] = useState<QuizState>('lobby');
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Reset the quiz state
  const resetQuiz = () => {
    setQuizState('lobby');
    setScore(0);
    setOpponentScore(0);
  };
  
  // Start the quiz game
  const startQuiz = () => {
    setQuizState('game');
    setTimeLeft(60); // 60 seconds for the quiz
  };
  
  // End the quiz and show results
  const endQuiz = () => {
    setQuizState('results');
  };
  
  // Timer effect for the quiz
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (quizState === 'game' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizState === 'game') {
      endQuiz();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [quizState, timeLeft]);
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl font-semibold">
          {quizState === 'game' && (
            <div className="flex items-center">
              <span className="text-purple-400">Time Left:</span>
              <span className="ml-2 px-3 py-1 bg-purple-800 rounded-lg">{timeLeft}s</span>
            </div>
          )}
        </div>
        <div>
          {/* Wallet connection will be handled separately */}
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-xl shadow-lg border border-purple-900/50 overflow-hidden">
        {quizState === 'lobby' && (
          <QuizLobby onStartQuiz={startQuiz} />
        )}
        
        {quizState === 'game' && (
          <QuizGame 
            onQuizComplete={endQuiz} 
            setScore={setScore}
            setOpponentScore={setOpponentScore}
          />
        )}
        
        {quizState === 'results' && (
          <QuizResults 
            score={score} 
            opponentScore={opponentScore}
            onPlayAgain={resetQuiz}
          />
        )}
      </div>
    </div>
  );
}
