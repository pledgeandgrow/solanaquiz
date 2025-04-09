import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

/**
 * Service for interacting with the Solana blockchain
 */
export const solanaService = {
  /**
   * Get the SOL balance for a wallet address
   * @param walletAddress The public key of the wallet
   * @returns The balance in SOL
   */
  getWalletBalance: async (walletAddress: string): Promise<number> => {
    try {
      // Use environment variable for RPC URL if available, otherwise use default devnet
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
      const connection = new Connection(rpcUrl, 'confirmed');
      
      const publicKey = new PublicKey(walletAddress);
      const balance = await connection.getBalance(publicKey);
      
      // Convert lamports to SOL
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw error;
    }
  },
  
  /**
   * Airdrop SOL to a wallet (only works on devnet/testnet)
   * @param walletAddress The public key of the wallet
   * @param amount Amount of SOL to airdrop (max 2 SOL per request on devnet)
   * @returns The transaction signature
   */
  requestAirdrop: async (walletAddress: string, amount = 1): Promise<string> => {
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
      const connection = new Connection(rpcUrl, 'confirmed');
      
      const publicKey = new PublicKey(walletAddress);
      const signature = await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL
      );
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');
      
      return signature;
    } catch (error) {
      console.error('Error requesting airdrop:', error);
      throw error;
    }
  },
  
  /**
   * Format SOL amount with appropriate precision
   * @param amount The amount in SOL
   * @returns Formatted string with SOL symbol
   */
  formatSol: (amount: number): string => {
    return `${amount.toFixed(4)} SOL`;
  }
};

export default solanaService;
