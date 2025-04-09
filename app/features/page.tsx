import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import FeatureCard from '../../components/features/FeatureCard';
import FeatureSection from '../../components/features/FeatureSection';

export default function FeaturesPage() {
  return (
    <Layout activePage="features">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover all the innovative features that make SolanaFlow the ultimate blockchain quiz platform
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🏆"
              title="Competitive Gameplay"
              description="Challenge other players to blockchain knowledge quizzes and climb the leaderboard to earn reputation and rewards."
            />
            <FeatureCard 
              icon="💰"
              title="Real SOL Rewards"
              description="Win SOL tokens by demonstrating your blockchain expertise. The better you perform, the more you earn."
            />
            <FeatureCard 
              icon="🔒"
              title="Secure Wallet Integration"
              description="Connect your Solana wallet seamlessly and securely to manage your earnings and participate in tournaments."
            />
            <FeatureCard 
              icon="📊"
              title="Performance Analytics"
              description="Track your quiz performance over time with detailed analytics and insights to improve your knowledge."
            />
            <FeatureCard 
              icon="🎓"
              title="Learn While Playing"
              description="Expand your blockchain knowledge through our educational quizzes covering various aspects of Solana and crypto."
            />
            <FeatureCard 
              icon="🌐"
              title="Global Community"
              description="Join a worldwide community of blockchain enthusiasts and compete in international tournaments."
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <FeatureSection 
        title="Advanced Quiz Mechanics"
        description="Our platform offers sophisticated quiz mechanics to create engaging and challenging experiences"
        features={[
          "Multiple quiz formats including timed challenges, lightning rounds, and tournaments",
          "Dynamic difficulty adjustment based on your performance",
          "Specialized topic categories from beginner to expert level",
          "Custom quiz creation for private competitions",
          "Real-time multiplayer functionality"
        ]}
        imageSrc="/quiz-mechanics.png"
        imageAlt="Advanced Quiz Mechanics"
        reversed={false}
      />

      <FeatureSection 
        title="Blockchain Integration"
        description="Seamlessly integrated with Solana blockchain for transparent and secure transactions"
        features={[
          "Instant payouts directly to your Solana wallet",
          "Verifiable on-chain quiz results and rewards",
          "NFT badges and achievements for top performers",
          "Token staking for premium tournaments with higher rewards",
          "Decentralized governance for community-driven platform development"
        ]}
        imageSrc="/blockchain-integration.png"
        imageAlt="Blockchain Integration"
        reversed={true}
      />

      <FeatureSection 
        title="Educational Content"
        description="Learn while you earn with our comprehensive educational resources"
        features={[
          "Curated learning paths for blockchain fundamentals",
          "Solana-specific technical knowledge modules",
          "DeFi and NFT educational content",
          "Regular updates with the latest blockchain developments",
          "Community-contributed knowledge base"
        ]}
        imageSrc="/educational-content.png"
        imageAlt="Educational Content"
        reversed={false}
      />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Test Your Blockchain Knowledge?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of players already earning SOL tokens through our quizzes
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/quiz"
              className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-3 font-medium text-white transition-all hover:opacity-90"
            >
              Start Playing Now
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-gray-700 px-8 py-3 font-medium text-gray-300 transition-all hover:bg-gray-800"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
