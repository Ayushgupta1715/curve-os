'use client';

import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ArrowUpRight, 
  Sliders
} from 'lucide-react';
import { RWAAsset } from '../types';

interface RWALaunchesProps {
  assets: RWAAsset[];
  onSelectAssetToTrade: (asset: RWAAsset) => void;
  onOpenInStudio: (asset: RWAAsset) => void;
}

export const RWALaunches: React.FC<RWALaunchesProps> = ({
  assets,
  onSelectAssetToTrade,
  onOpenInStudio,
}) => {
  const rwaAssets = assets.filter((a) => a.category === 'real-estate' || a.category === 'commodity' || a.category === 'private-equity');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#1B2632]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
            <Building2 className="w-5 h-5 text-[#18D5E8]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#F5F7FA] flex items-center gap-2">
              RWA Launches
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#18D5E8]/10 border border-[#18D5E8]/30 text-[#18D5E8]">
                Real Estate · Gold · Credit
              </span>
            </h1>
            <p className="text-xs text-[#7F8A99]">
              Institutional real-world assets launched with tailored Meteora bonding curves, rental yield distribution hooks, and audit-verified physical vault custody.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rwaAssets.map((asset) => {
          const fillPct = Math.min(100, Math.round((asset.raisedUsdc / asset.graduationTarget) * 100));

          return (
            <div
              key={asset.id}
              className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-xl hover:border-[#18D5E8]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#11161D] border border-[#1B2632] flex items-center justify-center text-xl">
                      {asset.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F5F7FA] font-mono text-base">{asset.ticker}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
                          {asset.badge}
                        </span>
                      </div>
                      <span className="text-xs text-[#7F8A99] line-clamp-1">{asset.name}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#7F8A99] mt-3 line-clamp-2">
                  {asset.description}
                </p>

                {/* Price Matrix */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#1B2632] font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#7F8A99] block">Current DBC Price</span>
                    <span className="text-base font-bold text-[#F5F7FA]">${asset.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#7F8A99] block">Graduation Cap</span>
                    <span className="text-base font-bold text-[#35E6A2]">${asset.graduationTarget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3 space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-[#7F8A99]">Graduation Progress</span>
                    <span className="text-[#35E6A2] font-bold">{fillPct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#070A0F] overflow-hidden border border-[#1B2632]">
                    <div
                      className="h-full bg-gradient-to-r from-[#18D5E8] to-[#35E6A2]"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#7F8A99]">
                    <span>${asset.raisedUsdc.toLocaleString()} USDC</span>
                    <span>Curve: {asset.curveShape}</span>
                  </div>
                </div>

                {/* Legal & Hook */}
                <div className="mt-3 pt-3 border-t border-[#1B2632] text-[11px] text-[#7F8A99] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#F5F7FA]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#35E6A2] shrink-0" />
                    <span className="truncate">{asset.backingDoc}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-[#1B2632] flex items-center gap-2">
                <button
                  onClick={() => onSelectAssetToTrade(asset)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#18D5E8] hover:bg-[#45E0F0] text-[#070A0F] font-mono text-xs font-bold flex items-center justify-center gap-1 transition-all"
                >
                  <span>Trade on DBC</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenInStudio(asset)}
                  className="p-2 rounded-xl bg-[#11161D] hover:bg-[#1B2632] border border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA]"
                  title="Inspect Curve in Studio"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
