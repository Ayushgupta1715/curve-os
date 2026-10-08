'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowUpDown, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Flame
} from 'lucide-react';
import { RWAAsset } from '../types';

interface TradingTerminalProps {
  assets: RWAAsset[];
  selectedAsset: RWAAsset;
  onSelectAsset: (asset: RWAAsset) => void;
  walletBalance: number;
  onExecuteTrade: (assetId: string, isBuy: boolean, amountUsdc: number) => { success: boolean; tokens: number; graduated: boolean };
}

export const TradingTerminal: React.FC<TradingTerminalProps> = ({
  assets,
  selectedAsset,
  onSelectAsset,
  walletBalance,
  onExecuteTrade,
}) => {
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
  const [tradeAmount, setTradeAmount] = useState<number>(5000);
  const [lastTxNotice, setLastTxNotice] = useState<{ text: string; graduated?: boolean } | null>(null);

  const fillPercent = Math.min(100, Math.round((selectedAsset.raisedUsdc / selectedAsset.graduationTarget) * 100));
  const tokensEstimate = tradeMode === 'buy'
    ? Math.round((tradeAmount / Math.max(0.01, selectedAsset.currentPrice)) * 100) / 100
    : tradeAmount;

  const handleTrade = () => {
    if (tradeAmount <= 0) return;
    const result = onExecuteTrade(selectedAsset.id, tradeMode === 'buy', tradeAmount);
    if (result.success) {
      if (result.graduated) {
        setLastTxNotice({
          text: `🎉 CONGRATULATIONS! Trade triggered Meteora DAMM v2 Graduation! 100% of reserves migrated to permanent locked LP pool.`,
          graduated: true,
        });
      } else {
        setLastTxNotice({
          text: `Success! Executed ${tradeMode.toUpperCase()} for ${result.tokens.toLocaleString()} ${selectedAsset.ticker} tokens on Meteora DBC.`,
          graduated: false,
        });
      }
      setTimeout(() => setLastTxNotice(null), 6000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#1B2632] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
            <Layers className="w-5 h-5 text-[#18D5E8]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#F5F7FA] flex items-center gap-2">
              DBC Trading & DAMM
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#18D5E8]/10 border border-[#18D5E8]/30 text-[#18D5E8]">
                Solana Non-Custodial
              </span>
            </h1>
            <p className="text-xs text-[#7F8A99]">
              Continuous price discovery on Meteora Dynamic Bonding Curves with automated threshold-triggered DAMM v2 liquidity graduation.
            </p>
          </div>
        </div>

        {/* Asset Quick Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {assets.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelectAsset(a)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedAsset.id === a.id
                  ? 'bg-[#18D5E8]/15 border border-[#18D5E8]/50 text-[#18D5E8]'
                  : 'bg-[#0D1219] border border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA]'
              }`}
            >
              <span>{a.icon}</span>
              <span>{a.ticker}</span>
              {a.isGraduated && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#35E6A2]/20 text-[#35E6A2]">DAMM</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Asset Live Status & Graduation Meter */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B2632]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#11161D] border border-[#1B2632] flex items-center justify-center text-xl">
                  {selectedAsset.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[#F5F7FA] font-mono">{selectedAsset.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
                      {selectedAsset.ticker}
                    </span>
                  </div>
                  <span className="text-xs text-[#7F8A99] font-mono">
                    Valuation: ${(selectedAsset.valuation / 1000000).toFixed(1)}M USD
                  </span>
                </div>
              </div>

              {selectedAsset.isGraduated ? (
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#35E6A2]/15 text-[#35E6A2] font-mono text-xs border border-[#35E6A2]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> GRADUATED TO DAMM v2
                  </span>
                  <span className="text-[10px] text-[#7F8A99] block font-mono mt-0.5">Pool Locked & Yielding</span>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-[10px] text-[#7F8A99] font-mono uppercase block">DBC Price</span>
                  <span className="text-xl font-black text-[#F5F7FA] font-mono">
                    ${selectedAsset.currentPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Price Discovery Progress to DAMM v2 */}
            <div className="bg-[#11161D] p-4 rounded-xl border border-[#1B2632] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#F5F7FA] font-semibold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#35E6A2]" />
                  Graduation Progress → Meteora DAMM v2
                </span>
                <span className="text-[#35E6A2] font-bold">{fillPercent}% Complete</span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-[#070A0F] overflow-hidden border border-[#1B2632] relative">
                <div
                  className="h-full bg-gradient-to-r from-[#18D5E8] to-[#35E6A2] transition-all duration-300"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#7F8A99] pt-1">
                <span>Raised: <strong className="text-[#F5F7FA]">${selectedAsset.raisedUsdc.toLocaleString()} USDC</strong></span>
                <span>Graduation Trigger: <strong className="text-[#35E6A2]">${selectedAsset.graduationTarget.toLocaleString()} USDC</strong></span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070A0F] border border-[#1B2632] text-xs space-y-1.5">
              <div className="font-mono font-bold text-[#18D5E8] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Meteora DBC Mechanics
              </div>
              <p className="text-[#7F8A99] leading-relaxed text-[11px]">
                Orders execute algorithmically against Meteora's program-derived bonding curve. No central market maker needed. At ${selectedAsset.graduationTarget.toLocaleString()} USDC volume, 100% of accumulated quote reserves automatically initialize a permanent Meteora DAMM v2 pool with locked LP tokens.
              </p>
            </div>

            {/* Legal Document & Transfer Hook */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632] space-y-1">
                <span className="text-[#7F8A99] text-[10px] uppercase block">Legal SPV Custody Deed</span>
                <div className="flex items-center gap-1.5 text-[#F5F7FA]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#35E6A2] shrink-0" />
                  <span className="truncate">{selectedAsset.backingDoc}</span>
                </div>
              </div>
              <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632] space-y-1">
                <span className="text-[#7F8A99] text-[10px] uppercase block">Transfer Hook Rule</span>
                <div className="flex items-center gap-1.5 text-[#18D5E8]">
                  <Lock className="w-3.5 h-3.5 text-[#18D5E8] shrink-0" />
                  <span className="truncate">{selectedAsset.transferHookRule}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Buy / Sell Trading Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-2xl space-y-4">
            {/* Buy / Sell Tab */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#11161D] rounded-xl border border-[#1B2632] text-xs font-mono font-bold">
              <button
                onClick={() => setTradeMode('buy')}
                className={`py-2 rounded-lg transition-all ${
                  tradeMode === 'buy'
                    ? 'bg-[#35E6A2] text-[#070A0F]'
                    : 'text-[#7F8A99] hover:text-[#F5F7FA]'
                }`}
              >
                BUY {selectedAsset.ticker}
              </button>
              <button
                onClick={() => setTradeMode('sell')}
                className={`py-2 rounded-lg transition-all ${
                  tradeMode === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'text-[#7F8A99] hover:text-[#F5F7FA]'
                }`}
              >
                SELL {selectedAsset.ticker}
              </button>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#7F8A99]">
                  {tradeMode === 'buy' ? 'You Pay (USDC)' : `You Sell (${selectedAsset.ticker})`}
                </span>
                <span className="text-[#7F8A99]">
                  Wallet: <strong className="text-[#F5F7FA]">${walletBalance.toLocaleString()} USDC</strong>
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#11161D] border border-[#1B2632] rounded-xl p-3 text-lg font-mono font-bold text-[#F5F7FA] focus:outline-none focus:border-[#18D5E8]/60"
                />
                <div className="absolute right-3 top-3.5 text-xs font-mono text-[#18D5E8] font-bold">
                  {tradeMode === 'buy' ? 'USDC' : selectedAsset.ticker}
                </div>
              </div>

              {/* Quick amount chips */}
              <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                {[1000, 5000, 25000, 50000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTradeAmount(amt)}
                    className="flex-1 py-1 rounded bg-[#11161D] hover:bg-[#1B2632] border border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA] transition-all"
                  >
                    +${amt >= 1000 ? `${amt / 1000}k` : amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Execution Estimates */}
            <div className="bg-[#11161D] rounded-xl p-3.5 border border-[#1B2632] space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#7F8A99]">
                <span>Estimated Received</span>
                <span className="text-[#F5F7FA] font-bold">
                  {tradeMode === 'buy' ? `${tokensEstimate.toLocaleString()} ${selectedAsset.ticker}` : `$${(tradeAmount * selectedAsset.currentPrice).toLocaleString()} USDC`}
                </span>
              </div>
              <div className="flex justify-between text-[#7F8A99]">
                <span>Execution Price</span>
                <span className="text-[#18D5E8] font-bold">${selectedAsset.currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#7F8A99]">
                <span>Meteora Dynamic Fee</span>
                <span className="text-[#35E6A2] font-bold">0.75%</span>
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleTrade}
              className={`w-full py-3 rounded-xl font-mono text-xs font-black tracking-wider transition-all ${
                tradeMode === 'buy'
                  ? 'bg-[#35E6A2] hover:bg-[#5EEAB3] text-[#070A0F]'
                  : 'bg-red-500 hover:bg-red-400 text-white'
              }`}
            >
              EXECUTE {tradeMode.toUpperCase()} ON METEORA DBC
            </button>

            {lastTxNotice && (
              <div className={`p-3 rounded-xl text-xs font-mono border transition-all animate-in fade-in ${
                lastTxNotice.graduated
                  ? 'bg-[#35E6A2]/15 border-[#35E6A2]/40 text-[#35E6A2]'
                  : 'bg-[#18D5E8]/10 border-[#18D5E8]/30 text-[#18D5E8]'
              }`}>
                {lastTxNotice.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
