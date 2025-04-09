import Image from "next/image";
import Link from "next/link";
import BlockchainDemoSection from '../components/blockchain/BlockchainDemoSection';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout activePage="home">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24" id="hero">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
            <svg width="800" height="800" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9945FF" />
                  <stop offset="100%" stopColor="#14F195" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="url(#grad)" strokeWidth="0.2">
                {[...Array(20)].map((_, i) => (
                  <circle key={i} cx="50" cy="50" r={10 + i * 4} opacity={1 - i / 20} />
                ))}
              </g>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              <span className="bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-transparent">
                SolanaFlow
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-gray-300">
              The next generation blockchain-powered SaaS platform built on Solana.
              Secure, scalable, and lightning-fast solutions for your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/quiz"
                className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-3 font-medium text-white transition-all hover:opacity-90"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-300 transition-all hover:bg-gray-800"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24" id="features">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Powered by <span className="text-purple-500">Solana Blockchain</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Leverage the power of Solana's high-performance blockchain for your business applications
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Lightning Fast Transactions</h3>
              <p className="text-gray-400">
                Process thousands of transactions per second with minimal fees on Solana's high-performance blockchain.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Secure Smart Contracts</h3>
              <p className="text-gray-400">
                Build and deploy secure smart contracts with Solana's Rust-based programming model for enterprise-grade security.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Decentralized Infrastructure</h3>
              <p className="text-gray-400">
                Eliminate single points of failure with a decentralized architecture that ensures high availability and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-900/50" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Our platform simplifies blockchain integration for your business
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900 text-2xl font-bold">1</div>
              <h3 className="mb-2 text-xl font-semibold">Connect</h3>
              <p className="text-gray-400">Connect your Solana wallet to our platform</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900 text-2xl font-bold">2</div>
              <h3 className="mb-2 text-xl font-semibold">Configure</h3>
              <p className="text-gray-400">Set up your business requirements and workflows</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900 text-2xl font-bold">3</div>
              <h3 className="mb-2 text-xl font-semibold">Deploy</h3>
              <p className="text-gray-400">Deploy your smart contracts to the Solana blockchain</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900 text-2xl font-bold">4</div>
              <h3 className="mb-2 text-xl font-semibold">Scale</h3>
              <p className="text-gray-400">Scale your application with Solana's high throughput</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24" id="pricing">
        <div className="container mx-auto px-6">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 to-purple-900">
            <div className="p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to get started?</h2>
                  <p className="mb-6 text-lg text-purple-100">
                    Join the next generation of blockchain-powered businesses today.
                  </p>
                  <button className="rounded-lg bg-white px-8 py-3 font-medium text-purple-900 transition-all hover:bg-gray-100">
                    Start Free Trial
                  </button>
                </div>
                <div className="hidden md:block">
                  <Image
                    src="/solana-logo.png"
                    alt="Solana Logo"
                    width={300}
                    height={300}
                    className="ml-auto opacity-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blockchain Demo Section */}
      <BlockchainDemoSection />
    </Layout>
  );
}
