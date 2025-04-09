'use client';

import { useState, useEffect } from 'react';

interface QuizGameProps {
  onQuizComplete: () => void;
  setScore: (score: number) => void;
  setOpponentScore: (score: number) => void;
}

// Sample quiz questions
const quizQuestions = [
  {
    question: "What is Solana's consensus mechanism called?",
    options: [
      "Proof of Work",
      "Proof of Stake",
      "Proof of History",
      "Delegated Proof of Stake"
    ],
    correctAnswer: 2, // Proof of History
  },
  {
    question: "What programming language is primarily used for Solana smart contracts?",
    options: [
      "JavaScript",
      "Rust",
      "Solidity",
      "Python"
    ],
    correctAnswer: 1, // Rust
  },
  {
    question: "What is Solana's native token?",
    options: [
      "SOL",
      "SLN",
      "SLNA",
      "SUN"
    ],
    correctAnswer: 0, // SOL
  },
  {
    question: "What is a unique feature of Solana that helps it achieve high throughput?",
    options: [
      "Sharding",
      "Layer 2 Solutions",
      "Proof of History",
      "Zero-Knowledge Proofs"
    ],
    correctAnswer: 2, // Proof of History
  },
  {
    question: "Approximately how many transactions per second (TPS) can Solana process?",
    options: [
      "15 TPS",
      "100 TPS",
      "1,000 TPS",
      "65,000 TPS"
    ],
    correctAnswer: 3, // 65,000 TPS
  }
];

export default function QuizGame({ onQuizComplete, setScore, setOpponentScore }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerTimer, setAnswerTimer] = useState(10); // 10 seconds per question
  
  // Current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Handle option selection
  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    // Check if answer is correct
    if (optionIndex === currentQuestion.correctAnswer) {
      setUserScore(userScore + 1);
    }
    
    // Simulate opponent answering
    const opponentCorrect = Math.random() > 0.4; // 60% chance of correct answer
    if (opponentCorrect) {
      setAiScore(aiScore + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setAnswerTimer(10);
      } else {
        // Quiz complete
        setScore(userScore + (optionIndex === currentQuestion.correctAnswer ? 1 : 0));
        setOpponentScore(aiScore + (opponentCorrect ? 1 : 0));
        onQuizComplete();
      }
    }, 2000);
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isAnswered && answerTimer > 0) {
      timer = setTimeout(() => {
        setAnswerTimer(answerTimer - 1);
      }, 1000);
    } else if (!isAnswered && answerTimer === 0) {
      // Time's up, auto-select wrong answer
      handleSelectOption(-1);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [answerTimer, isAnswered]);
  
  return (
    <div className="p-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Question {currentQuestionIndex + 1}/{quizQuestions.length}</span>
          <span>{answerTimer}s</span>
        </div>
      </div>
      
      {/* Score display */}
      <div className="flex justify-between mb-8">
        <div className="bg-gray-800 rounded-lg px-4 py-2">
          <div className="text-sm text-gray-400">Your Score</div>
          <div className="text-xl font-bold">{userScore}</div>
        </div>
        <div className="bg-gray-800 rounded-lg px-4 py-2">
          <div className="text-sm text-gray-400">Opponent</div>
          <div className="text-xl font-bold">{aiScore}</div>
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleSelectOption(index)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isAnswered && index === currentQuestion.correctAnswer
                  ? 'border-green-500 bg-green-900/30' // Correct answer
                  : isAnswered && index === selectedOption
                    ? 'border-red-500 bg-red-900/30' // Wrong answer
                    : selectedOption === index
                      ? 'border-purple-500 bg-purple-900/30' // Selected
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-500' // Default
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  isAnswered && index === currentQuestion.correctAnswer
                    ? 'bg-green-500' 
                    : isAnswered && index === selectedOption
                      ? 'bg-red-500'
                      : selectedOption === index
                        ? 'bg-purple-500'
                        : 'bg-gray-700'
                }`}>
                  <span className="text-xs">{String.fromCharCode(65 + index)}</span>
                </div>
                <span>{option}</span>
                
                {isAnswered && index === currentQuestion.correctAnswer && (
                  <svg className="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
