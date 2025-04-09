import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamically import the WalletConnectionProvider with SSR disabled
const WalletProviderWrapper = dynamic(
  () => import("../components/wallet/WalletProviderWrapper"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "SolanaFlow - Blockchain SaaS Platform",
  description: "Next generation blockchain-powered SaaS platform built on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProviderWrapper>
          {children}
        </WalletProviderWrapper>
      </body>
    </html>
  );
}
