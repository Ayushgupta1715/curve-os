import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CurveOS — AI-Native Programmable Launchpad on Meteora DBC',
  description: 'The AI-native programmable launch infrastructure for RWA and tokenized assets using Meteora Dynamic Bonding Curves (DBC) and DAMM v2 on Solana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070A0F] text-[#F5F7FA] antialiased selection:bg-[#18D5E8]/20">
        {children}
      </body>
    </html>
  );
}
