'use client';

import Link from 'next/link';
import QuizContent from '../../components/quiz/QuizContent';
import Layout from '../../components/layout/Layout';

export default function QuizPage() {
  return (
    <Layout activePage="quiz">
      {/* Quiz Header */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Solana Quiz Challenge
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your blockchain knowledge and win SOL tokens by competing with other players in real-time quizzes
          </p>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <QuizContent />
        </div>
      </section>
    </Layout>
  );
}
