'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the WalletConnectionProvider with SSR disabled
const WalletProviderWrapper = dynamic(
  () => import('../components/wallet/WalletProviderWrapper'),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  return <WalletProviderWrapper>{children}</WalletProviderWrapper>;
}
