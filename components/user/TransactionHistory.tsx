'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';

interface Transaction {
  signature: string;
  timestamp: number;
  status: 'success' | 'error';
  type: string;
  amount?: string;
}

export default function TransactionHistory() {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
        const connection = new Connection(rpcUrl, 'confirmed');
        
        // Get recent transactions for the wallet
        const signatures = await connection.getSignaturesForAddress(
          publicKey,
          { limit: 10 }
        );
        
        // Format transactions
        const formattedTransactions: Transaction[] = signatures.map(sig => {
          // Determine transaction type based on available data
          // This is a simplified example - in a real app, you'd parse the transaction data
          const type = sig.memo?.includes('airdrop') 
            ? 'Airdrop' 
            : sig.memo?.includes('transfer') 
              ? 'Transfer' 
              : 'Unknown';
          
          return {
            signature: sig.signature,
            timestamp: sig.blockTime ? sig.blockTime * 1000 : Date.now(),
            status: sig.err ? 'error' : 'success',
            type,
          };
        });
        
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [publicKey]);

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // Format transaction signature for display
  const formatSignature = (signature: string) => {
    return `${signature.slice(0, 4)}...${signature.slice(-4)}`;
  };

  if (!publicKey) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden w-full max-w-md mx-auto mt-6">
      <div className="p-6">
        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2 mb-4">
          Recent Transactions
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.signature} className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-sm font-medium ${tx.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                  <a 
                    href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    {formatSignature(tx.signature)} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <a 
            href={`https://explorer.solana.com/address/${publicKey.toString()}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            View all transactions in Solana Explorer ↗
          </a>
        </div>
      </div>
    </div>
  );
}
