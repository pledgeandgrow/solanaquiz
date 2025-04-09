'use client';

import Layout from '../../components/layout/Layout';
import UserDashboard from '../../components/user/UserDashboard';
import TransactionHistory from '../../components/user/TransactionHistory';
import { useUserAuth } from '../../lib/contexts/UserAuthContext';

export default function ProfilePage() {
  const { isAuthenticated } = useUserAuth();

  return (
    <Layout activePage="profile">
      {/* Profile Header */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Your Profile
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your Solana wallet and account information
          </p>
        </div>
      </section>

      {/* User Dashboard */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <UserDashboard />
          
          {/* Only show transaction history if user is authenticated */}
          {isAuthenticated && <TransactionHistory />}
        </div>
      </section>
    </Layout>
  );
}
