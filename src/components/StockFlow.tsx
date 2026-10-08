'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Sliders
} from 'lucide-react';
import { RWAAsset } from '../types';

interface StockFlowProps {
  assets: RWAAsset[];
  onSelectAssetToTrade: (asset: RWAAsset) => void;
  onOpenInStudio: (asset: RWAAsset) => void;
}

export const StockFlow: React.FC<StockFlowProps> = ({
  assets,
  onSelectAssetToTrade,
  onOpenInStudio,
}) => {
  const stockAssets = assets.filter((a) => a.category === 'stock');
  const [selectedStock, setSelectedStock] = useState<RWAAsset>(stockAssets[0] || assets[0]);

  return (
    <div className="space-y-6">
      {/* Flagship Header */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1219] border border-[#1B2632] p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#18D5E8]/10 border border-[#18D5E8]/30 text-[#18D5E8] font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18D5E8] animate-pulse" />
              CURVEOS FLAGSHIP MODULE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F7FA]">
              StockFlow <span className="text-[#18D5E8]">— Tokenized Equities</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#7F8A99] leading-relaxed">
              Continuous, compliant secondary market liquidity for pre-IPO unicorns (SpaceX, Stripe, OpenAI). Powered by Meteora Dynamic Bonding Curves and automated DAMM v2 migration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-[#11161D] px-4 py-3 rounded-xl border border-[#1B2632] font-mono text-xs">
              <span className="text-[#7F8A99] block text-[10px] uppercase">Secondary Float Underwritten</span>
              <span className="text-lg font-black text-[#35E6A2]">$437,000,000</span>
            </div>
            <div className="bg-[#11161D] px-4 py-3 rounded-xl border border-[#1B2632] font-mono text-xs">
              <span className="text-[#7F8A99] block text-[10px] uppercase">Settlement Time</span>
              <span className="text-lg font-black text-[#18D5E8]">400ms (Solana)</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#1B2632] text-xs text-[#7F8A99]">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#35E6A2] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F7FA] block font-semibold">1:1 SPV Custody Backing</strong>
              Delaware Statutory Trusts holding actual registered preferred stock.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#18D5E8] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F7FA] block font-semibold">Meteora DBC Discovery</strong>
              Orderly sigmoid bonding curve eliminates secondary OTC spread.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#35E6A2] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F7FA] block font-semibold">Permanent DAMM v2 Pool</strong>
              Automatic liquidity migration ensures non-custodial trading depth.
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tokenized Stocks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2 font-mono">
            <span>Live Pre-IPO Pools on Meteora DBC</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#11161D] text-[#7F8A99] border border-[#1B2632] font-normal">
              {stockAssets.length} Active Equities
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stockAssets.map((asset) => {
            const fillPct = Math.min(100, Math.round((asset.raisedUsdc / asset.graduationTarget) * 100));
            const isSelected = selectedStock.id === asset.id;

            return (
              <div
                key={asset.id}
                onClick={() => setSelectedStock(asset)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                  isSelected
                    ? 'bg-[#11161D] border-[#18D5E8]/60 shadow-lg'
                    : 'bg-[#0D1219] border-[#1B2632] hover:border-[#1B2632]/80 hover:bg-[#11161D]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#11161D] border border-[#1B2632] flex items-center justify-center text-xl">
                      {asset.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#F5F7FA] font-mono text-base">{asset.ticker}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
                          {asset.badge}
                        </span>
                      </div>
                      <span className="text-xs text-[#7F8A99] line-clamp-1">{asset.name}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#1B2632] font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#7F8A99] block">Current DBC Price</span>
                    <span className="text-base font-bold text-[#F5F7FA]">${asset.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#7F8A99] block">Graduation Target</span>
                    <span className="text-base font-bold text-[#35E6A2]">${asset.targetPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#7F8A99]">DAMM Graduation</span>
                    <span className="text-[#35E6A2] font-bold">{fillPct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#070A0F] overflow-hidden border border-[#1B2632]">
                    <div
                      className="h-full bg-gradient-to-r from-[#18D5E8] to-[#35E6A2]"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#7F8A99]">
                    <span>${asset.raisedUsdc.toLocaleString()} USDC</span>
                    <span>Cap: ${asset.graduationTarget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Legal Backing */}
                <div className="mt-4 pt-3 border-t border-[#1B2632] text-[11px] text-[#7F8A99] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#F5F7FA]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#35E6A2] shrink-0" />
                    <span className="truncate">{asset.backingDoc}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAssetToTrade(asset);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#18D5E8] hover:bg-[#45E0F0] text-[#070A0F] font-mono text-xs font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Trade on DBC</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInStudio(asset);
                    }}
                    className="p-2 rounded-xl bg-[#11161D] hover:bg-[#1B2632] border border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA]"
                    title="Open in Curve Studio"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
