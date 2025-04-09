'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WalletButton from '../wallet/WalletButton';
import { useUserAuth } from '../../lib/contexts/UserAuthContext';

interface HeaderProps {
  activePage?: 'home' | 'features' | 'how-it-works' | 'about' | 'quiz' | 'profile';
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useUserAuth();

  // Handle scroll effect for transparent to solid header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`border-b border-gray-800 py-4 sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-transparent">
                SolanaFlow
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/features" 
              className={`${activePage === 'features' ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Features
            </Link>
            <Link 
              href="/how-it-works" 
              className={`${activePage === 'how-it-works' ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              How It Works
            </Link>
            <Link 
              href="/about" 
              className={`${activePage === 'about' ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              About
            </Link>
            <Link 
              href="/quiz" 
              className={`${activePage === 'quiz' ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Quiz Game
            </Link>
            {isAuthenticated && (
              <Link 
                href="/profile" 
                className={`${activePage === 'profile' ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'} transition-colors`}
              >
                Profile
              </Link>
            )}
            <WalletButton className="ml-4" />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <WalletButton className="mr-4" />
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <Link 
              href="/features" 
              className={`block py-2 ${activePage === 'features' ? 'text-purple-400' : 'text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/how-it-works" 
              className={`block py-2 ${activePage === 'how-it-works' ? 'text-purple-400' : 'text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/about" 
              className={`block py-2 ${activePage === 'about' ? 'text-purple-400' : 'text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/quiz" 
              className={`block py-2 ${activePage === 'quiz' ? 'text-purple-400' : 'text-gray-300'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Quiz Game
            </Link>
            {isAuthenticated && (
              <Link 
                href="/profile" 
                className={`block py-2 ${activePage === 'profile' ? 'text-purple-400' : 'text-gray-300'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
