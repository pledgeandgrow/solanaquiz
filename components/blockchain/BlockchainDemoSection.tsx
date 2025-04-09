'use client';

import BlockchainDemo from './BlockchainDemo';

export default function BlockchainDemoSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Try It Yourself</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Experience the power of Solana blockchain with this interactive demo
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <BlockchainDemo />
        </div>
      </div>
    </section>
  );
}
