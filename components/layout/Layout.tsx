'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  activePage?: 'home' | 'features' | 'how-it-works' | 'about' | 'quiz' | 'profile';
}

export default function Layout({ children, activePage = 'home' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      <Header activePage={activePage} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
