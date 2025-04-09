import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

// Program ID from the smart contract - replace with your actual deployed program ID
export const QUIZ_PROGRAM_ID = new PublicKey('6E7BXgFBr5z2Ebh4BDUcNrqCZx59adedkZQK5KhypuPT');

// Game status enum that matches the Rust contract
export enum GameStatus {
  Pending = 'Pending',
  Finished = 'Finished',
  Cancelled = 'Cancelled'
}

// Interface for the game account data that matches the Rust struct
export interface GameAccount {
  playerOne: PublicKey;
  playerTwo: PublicKey;
  betAmount: anchor.BN;
  status: GameStatus;
  winner: PublicKey | null;
}

// Interface for the game details returned to the frontend
export interface GameDetails {
  playerOne: string;
  playerTwo: string;
  betAmount: number;
  status: GameStatus;
  winner: string | null;
}

// Response interfaces
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export type ContractResponse<T> = SuccessResponse<T> | ErrorResponse;

// IDL (Interface Definition Language) for the Quiz contract
// This matches the structure of your Rust program
export const QuizIDL = {
  version: '0.1.0',
  name: 'quiz_bet',
  instructions: [
    {
      name: 'initializeGame',
      accounts: [
        {
          name: 'gameAccount',
          isMut: true,
          isSigner: true
        },
        {
          name: 'playerOne',
          isMut: true,
          isSigner: true
        },
        {
          name: 'playerTwo',
          isMut: false,
          isSigner: false
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'betAmount',
          type: 'u64'
        }
      ]
    }
  ],
  accounts: [
    {
      name: 'gameAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'playerOne',
            type: 'publicKey'
          },
          {
            name: 'playerTwo',
            type: 'publicKey'
          },
          {
            name: 'betAmount',
            type: 'u64'
          },
          {
            name: 'status',
            type: {
              defined: 'GameStatus'
            }
          },
          {
            name: 'winner',
            type: { option: 'publicKey' }
          }
        ]
      }
    }
  ],
  types: [
    {
      name: 'GameStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Pending'
          },
          {
            name: 'Finished'
          },
          {
            name: 'Cancelled'
          }
        ]
      }
    }
  ]
};

// Helper function to get the program instance
export const getQuizProgram = (connection: Connection, wallet: anchor.Wallet): Program<any> => {
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    { commitment: 'processed' }
  );
  
  return new Program(QuizIDL as anchor.Idl, QUIZ_PROGRAM_ID, provider);
};

// Custom hook to interact with the quiz contract
export const useQuizContract = () => {
  const wallet = useAnchorWallet();
  
  // Initialize a new game between two players
  const initializeGame = async (playerTwoPublicKey: string, betAmount: number): Promise<ContractResponse<{
    gameAccountPublicKey: string;
    transactionId: string;
  }>> => {
    if (!wallet) {
      return {
        success: false,
        error: 'Wallet not connected'
      };
    }
    
    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com');
      const program = getQuizProgram(connection, wallet as unknown as anchor.Wallet);
      
      // Create a new account for the game
      const gameAccount = anchor.web3.Keypair.generate();
      
      // Convert bet amount to lamports (SOL's smallest unit)
      const betAmountLamports = betAmount * LAMPORTS_PER_SOL;
      
      // Convert string to PublicKey
      const playerTwoPubkey = new PublicKey(playerTwoPublicKey);
      
      // Call the initialize_game instruction
      const tx = await program.methods
        .initializeGame(new anchor.BN(betAmountLamports))
        .accounts({
          gameAccount: gameAccount.publicKey,
          playerOne: wallet.publicKey,
          playerTwo: playerTwoPubkey,
          systemProgram: SystemProgram.programId,
        })
        .signers([gameAccount])
        .rpc();
      
      console.log('Game initialized with transaction:', tx);
      return {
        success: true,
        data: {
          gameAccountPublicKey: gameAccount.publicKey.toString(),
          transactionId: tx
        }
      };
    } catch (error: unknown) {
      console.error('Error initializing game:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  };
  
  // Get game details from a game account public key
  const getGameDetails = async (gameAccountPublicKey: string): Promise<ContractResponse<GameDetails>> => {
    if (!wallet) {
      return {
        success: false,
        error: 'Wallet not connected'
      };
    }
    
    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com');
      const program = getQuizProgram(connection, wallet as unknown as anchor.Wallet);
      
      // Fetch the game account data
      const gameAccountPubkey = new PublicKey(gameAccountPublicKey);
      const gameAccountData = await program.account.gameAccount.fetch(gameAccountPubkey);
      
      // Map the status enum to a string
      let status: GameStatus;
      if (gameAccountData.status.pending) {
        status = GameStatus.Pending;
      } else if (gameAccountData.status.finished) {
        status = GameStatus.Finished;
      } else {
        status = GameStatus.Cancelled;
      }
      
      // Convert to a more frontend-friendly format
      const gameDetails: GameDetails = {
        playerOne: gameAccountData.playerOne.toString(),
        playerTwo: gameAccountData.playerTwo.toString(),
        betAmount: gameAccountData.betAmount.toNumber() / LAMPORTS_PER_SOL,
        status: status,
        winner: gameAccountData.winner ? gameAccountData.winner.toString() : null
      };
      
      return {
        success: true,
        data: gameDetails
      };
    } catch (error: unknown) {
      console.error('Error fetching game details:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  };
  
  return {
    initializeGame,
    getGameDetails
  };
};
