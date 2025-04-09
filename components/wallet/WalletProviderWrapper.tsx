'use client';

import { ReactNode } from 'react';
import { WalletConnectionProvider } from './WalletConnectionProvider';
import ClientOnly from '../utils/ClientOnly';

interface WalletProviderWrapperProps {
  children: ReactNode;
}

export default function WalletProviderWrapper({ children }: WalletProviderWrapperProps) {
  return (
    <ClientOnly>
      <WalletConnectionProvider>
        {children}
      </WalletConnectionProvider>
    </ClientOnly>
  );
}
