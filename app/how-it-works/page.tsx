import Link from 'next/link';
import Image from 'next/image';
import StepCard from '../../components/how-it-works/StepCard';
import ProcessFlow from '../../components/how-it-works/ProcessFlow';
import FaqAccordion from '../../components/how-it-works/FaqAccordion';
import Layout from '../../components/layout/Layout';

export default function HowItWorksPage() {
  // Process steps data
  const processSteps = [
    {
      title: "Connect Your Wallet",
      description: "Start by connecting your Solana wallet to our platform. We support Phantom, Solflare, and other popular Solana wallets."
    },
    {
      title: "Choose a Quiz Category",
      description: "Select from various blockchain topics including Solana basics, DeFi concepts, NFTs, and more advanced technical subjects."
    },
    {
      title: "Set Your Stake",
      description: "Decide how much SOL you want to wager on the quiz. Higher stakes mean bigger potential rewards."
    },
    {
      title: "Match with an Opponent",
      description: "Our matchmaking system will pair you with another player of similar skill level for a fair competition."
    },
    {
      title: "Answer Questions",
      description: "Test your knowledge by answering timed questions about blockchain and Solana. The faster and more accurate your answers, the higher your score."
    },
    {
      title: "Claim Your Rewards",
      description: "If you win, SOL tokens will be automatically transferred to your connected wallet. Rewards are processed on-chain for transparency."
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "How do I earn SOL tokens through quizzes?",
      answer: "When you win a quiz match against another player, you'll earn SOL tokens based on the stake amount and difficulty level. The rewards are automatically sent to your connected Solana wallet after the match concludes."
    },
    {
      question: "Is my SOL safe on the platform?",
      answer: "Yes, we never take custody of your funds. All transactions happen directly through your connected wallet, and smart contracts ensure fair distribution of rewards. Your SOL remains in your wallet until you decide to stake it for a quiz."
    },
    {
      question: "What happens if I lose connection during a quiz?",
      answer: "If you lose connection during a quiz, you'll have a short grace period to reconnect. If you can't reconnect within that time, the match will be considered forfeit and your stake may be lost. We recommend having a stable internet connection before starting a quiz."
    },
    {
      question: "How are quiz questions created and verified?",
      answer: "Our questions are created by blockchain experts and go through a rigorous verification process to ensure accuracy. We regularly update our question bank to reflect the latest developments in the Solana ecosystem."
    },
    {
      question: "Can I create my own quizzes?",
      answer: "Premium subscribers can create custom quizzes and challenge friends or the community. Custom quizzes can be private or public, and you can set your own stake amounts and rules."
    }
  ];

  return (
    <Layout activePage="how-it-works">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn how our blockchain-powered quiz platform helps you earn while you learn
          </p>
        </div>
      </section>

      {/* Step Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Get Started in 3 Simple Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number={1}
              icon="👛"
              title="Connect Your Wallet"
              description="Link your Solana wallet to our platform with a single click. No registration required."
            />
            <StepCard 
              number={2}
              icon="🎮"
              title="Play Quiz Games"
              description="Challenge other players to test your blockchain knowledge in various categories."
            />
            <StepCard 
              number={3}
              icon="💰"
              title="Earn SOL Rewards"
              description="Win quizzes to earn SOL tokens directly to your wallet. The better you perform, the more you earn."
            />
          </div>
        </div>
      </section>

      {/* Detailed Process Flow */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">The Complete Process</h2>
          
          <div className="max-w-3xl mx-auto">
            <ProcessFlow steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Visual Explanation */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden">
                {/* Fallback div in case image fails to load */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                  <span className="text-2xl text-purple-300">Platform Workflow</span>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">How Our Platform Works</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Secure Wallet Integration</h3>
                  <p className="text-gray-400">
                    Our platform connects directly with your Solana wallet using secure wallet adapters. 
                    We never have access to your private keys or funds.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Smart Contract Powered</h3>
                  <p className="text-gray-400">
                    All quiz matches and rewards are managed by transparent smart contracts on the Solana blockchain,
                    ensuring fair play and automatic payouts.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Skill-Based Matchmaking</h3>
                  <p className="text-gray-400">
                    Our algorithm matches you with players of similar skill level to ensure fair and 
                    competitive quiz experiences for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <FaqAccordion faqs={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Earning SOL?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of players already testing their blockchain knowledge and earning rewards
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/quiz"
              className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-3 font-medium text-white transition-all hover:opacity-90"
            >
              Play Now
            </Link>
            <Link
              href="/features"
              className="rounded-lg border border-gray-700 px-8 py-3 font-medium text-gray-300 transition-all hover:bg-gray-800"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
