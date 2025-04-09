// User profile service for handling user data and wallet connections

interface UserProfile {
  id?: string;
  email: string;
  username: string;
  walletAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mock database for demonstration purposes
// In a real application, this would be replaced with API calls to your backend
const mockUserProfiles: UserProfile[] = [];

export const userProfileService = {
  /**
   * Register a new user or update an existing one
   */
  registerUser: async (profile: UserProfile): Promise<UserProfile> => {
    try {
      // In a real application, this would be an API call to your backend
      console.log('Registering user with profile:', profile);
      
      // Check if user with this wallet already exists
      const existingUserIndex = mockUserProfiles.findIndex(
        user => user.walletAddress === profile.walletAddress
      );
      
      if (existingUserIndex >= 0) {
        // Update existing user
        mockUserProfiles[existingUserIndex] = {
          ...mockUserProfiles[existingUserIndex],
          ...profile,
          updatedAt: new Date()
        };
        return mockUserProfiles[existingUserIndex];
      } else {
        // Create new user
        const newUser: UserProfile = {
          ...profile,
          id: `user_${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockUserProfiles.push(newUser);
        return newUser;
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
  
  /**
   * Get user profile by wallet address
   */
  getUserByWallet: async (walletAddress: string): Promise<UserProfile | null> => {
    try {
      // In a real application, this would be an API call to your backend
      const user = mockUserProfiles.find(user => user.walletAddress === walletAddress);
      return user || null;
    } catch (error) {
      console.error('Error getting user by wallet:', error);
      throw error;
    }
  },
  
  /**
   * Check if a wallet is already registered
   */
  isWalletRegistered: async (walletAddress: string): Promise<boolean> => {
    try {
      const user = await userProfileService.getUserByWallet(walletAddress);
      return !!user;
    } catch (error) {
      console.error('Error checking wallet registration:', error);
      return false;
    }
  }
};

export default userProfileService;
