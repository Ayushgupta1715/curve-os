'use client';

import React from 'react';
import { 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  Bot, 
  Compass, 
  Layers, 
  Wallet, 
  DollarSign,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export type ActiveTab = 'studio' | 'architect' | 'stockflow' | 'rwa' | 'ai-assets' | 'marketplace' | 'terminal';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  walletBalance: number;
  onFaucetClick: () => void;
  isWalletConnected: boolean;
  setIsWalletConnected: (c: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  walletBalance,
  onFaucetClick,
  isWalletConnected,
  setIsWalletConnected,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1B2632] bg-[#070A0F]/95 backdrop-blur-md">
      {/* Row 1: Primary Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Product Brand */}
          <button 
            onClick={() => setActiveTab('studio')}
            className="flex items-center gap-2.5 text-left group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0D1219] border border-[#1B2632] flex items-center justify-center font-black text-[#18D5E8] text-base group-hover:border-[#18D5E8]/60 transition-colors">
              CΩ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#F5F7FA] font-mono">
                  Curve<span className="text-[#18D5E8]">OS</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#11161D] text-[#7F8A99] border border-[#1B2632]">
                  Meteora DBC
                </span>
              </div>
              <p className="text-[10px] text-[#7F8A99] font-mono leading-none hidden sm:block">
                Programmable Token Launchpad
              </p>
            </div>
          </button>

          {/* Module Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0D1219] p-1 rounded-xl border border-[#1B2632] text-xs font-medium">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'studio'
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] font-bold border border-[#18D5E8]/40 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Curve Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('architect')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'architect'
                  ? 'bg-[#A78BFA]/20 text-[#A78BFA] font-bold border border-[#A78BFA]/50 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#A78BFA] hover:bg-white/[0.03]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>AI Architect</span>
            </button>

            <button
              onClick={() => setActiveTab('stockflow')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'stockflow'
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] font-bold border border-[#18D5E8]/40 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>StockFlow</span>
            </button>

            <button
              onClick={() => setActiveTab('rwa')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'rwa'
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] font-bold border border-[#18D5E8]/40 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>RWA</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-assets')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'ai-assets'
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] font-bold border border-[#18D5E8]/40 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Assets</span>
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] font-bold border border-[#18D5E8]/40 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'terminal'
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] font-bold border border-[#18D5E8]/40 shadow-sm'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-white/[0.03]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Trading & DAMM</span>
            </button>
          </nav>

          {/* Right Actions: Faucet + Wallet */}
          <div className="flex items-center gap-2">
            <button
              onClick={onFaucetClick}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#11161D] hover:bg-[#1B2632] border border-[#1B2632] text-[#35E6A2] transition-colors"
              title="Add 10,000 simulated USDC"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#35E6A2]" />
              <span className="hidden sm:inline">Faucet: </span>+10k USDC
            </button>

            {isWalletConnected ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1219] border border-[#1B2632] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#35E6A2]" />
                <span className="text-[#F5F7FA] font-semibold">
                  ${walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[#7F8A99] hidden sm:inline">USDC</span>
                <button
                  onClick={() => setIsWalletConnected(false)}
                  className="ml-1 text-[11px] text-[#7F8A99] hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsWalletConnected(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#18D5E8] hover:bg-[#45E0F0] text-[#070A0F] font-bold text-xs tracking-wide transition-colors"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Clean Sub-Bar (Status, Track & Network) */}
      <div className="border-t border-[#1B2632] bg-[#070A0F]/80 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] font-mono text-[#7F8A99]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18D5E8]/10 text-[#18D5E8] font-bold border border-[#18D5E8]/30 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18D5E8] animate-pulse" />
              METEORA DBC NATIVE
            </span>
            <span>Superteam Earn: <strong className="text-[#F5F7FA]">Best use of Meteora DBC</strong></span>
            <span className="text-[#1B2632]">|</span>
            <span className="text-[#35E6A2] flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> DAMM v2 Migration Ready
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#7F8A99]">
            <span className="flex items-center gap-1 text-[#F5F7FA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35E6A2]" />
              Solana Devnet
            </span>
            <span>Program: <code className="text-[#18D5E8]">DBC1...meteora</code></span>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Scroll for Tabs */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-[#1B2632] text-xs font-medium bg-[#0D1219]">
        {[
          { id: 'studio', label: 'Curve Studio', icon: Sliders },
          { id: 'architect', label: 'AI Architect', icon: Sparkles },
          { id: 'stockflow', label: 'StockFlow', icon: TrendingUp },
          { id: 'rwa', label: 'RWA', icon: Building2 },
          { id: 'ai-assets', label: 'AI Assets', icon: Bot },
          { id: 'marketplace', label: 'Marketplace', icon: Compass },
          { id: 'terminal', label: 'Trading & DAMM', icon: Layers },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#18D5E8]/15 text-[#18D5E8] border border-[#18D5E8]/40 font-bold'
                  : 'text-[#7F8A99] hover:text-[#F5F7FA] bg-[#11161D]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
