'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import userProfileService from '../services/userProfileService';

interface UserProfile {
  id?: string;
  email: string;
  username: string;
  walletAddress: string;
}

interface UserAuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isLoading: boolean;
  registerUser: (email: string, username: string) => Promise<void>;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  isLoading: false,
  registerUser: async () => {},
  logout: () => {},
});

export const useUserAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const { connected, publicKey, disconnect } = useWallet();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if the connected wallet has a user profile
  useEffect(() => {
    const checkUserProfile = async () => {
      if (connected && publicKey) {
        setIsLoading(true);
        try {
          const walletAddress = publicKey.toString();
          const profile = await userProfileService.getUserByWallet(walletAddress);
          
          if (profile) {
            setUserProfile(profile);
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Error checking user profile:', error);
          setUserProfile(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserProfile(null);
      }
    };
    
    checkUserProfile();
  }, [connected, publicKey]);
  
  // Register a new user
  const registerUser = async (email: string, username: string) => {
    if (!connected || !publicKey) {
      throw new Error('Wallet not connected');
    }
    
    setIsLoading(true);
    try {
      const walletAddress = publicKey.toString();
      const profile = await userProfileService.registerUser({
        email,
        username,
        walletAddress,
      });
      
      setUserProfile(profile);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout user
  const logout = async () => {
    try {
      await disconnect();
      setUserProfile(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <UserAuthContext.Provider
      value={{
        isAuthenticated: !!userProfile,
        userProfile,
        isLoading,
        registerUser,
        logout,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
