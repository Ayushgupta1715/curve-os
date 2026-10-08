'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Sliders, 
  Copy, 
  Filter,
  Check
} from 'lucide-react';
import { DBC_PRESETS } from '../data/presets';
import { DBCPreset, CurveParameters } from '../types';

interface CurveMarketplaceProps {
  onLoadPreset: (params: CurveParameters) => void;
}

export const CurveMarketplace: React.FC<CurveMarketplaceProps> = ({
  onLoadPreset,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPresets = filter === 'all'
    ? DBC_PRESETS
    : DBC_PRESETS.filter((p) => p.category === filter);

  const handleCopyJson = (preset: DBCPreset) => {
    navigator.clipboard.writeText(JSON.stringify(preset.params, null, 2));
    setCopiedId(preset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#1B2632]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
            <Compass className="w-5 h-5 text-[#18D5E8]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#F5F7FA] flex items-center gap-2">
              Curve Marketplace
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#11161D] border border-[#1B2632] text-[#7F8A99]">
                Shareable DBC Presets
              </span>
            </h1>
            <p className="text-xs text-[#7F8A99]">
              Browse, fork, and deploy audited dynamic bonding curve presets calibrated for specific regulatory and liquidity profiles.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <Filter className="w-3.5 h-3.5 text-[#7F8A99] mr-1 shrink-0" />
        {[
          { id: 'all', label: 'All Presets' },
          { id: 'stock', label: 'Tokenized Stocks' },
          { id: 'real-estate', label: 'Real Estate' },
          { id: 'commodity', label: 'Commodities' },
          { id: 'ai-compute', label: 'AI Compute' },
          { id: 'private-equity', label: 'Private Equity' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
              filter === item.id
                ? 'bg-[#18D5E8]/15 border-[#18D5E8]/50 text-[#18D5E8] font-bold'
                : 'bg-[#11161D] border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-xl hover:border-[#18D5E8]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[#F5F7FA] font-mono">{preset.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
                      {preset.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#7F8A99] font-mono">
                    By {preset.author} · {preset.downloads.toLocaleString()} deployments
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7F8A99] mt-2.5">
                {preset.description}
              </p>

              <div className="mt-3 p-3 rounded-xl bg-[#11161D] border border-[#1B2632] text-[11px] text-[#7F8A99] italic">
                "{preset.reasoning}"
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#1B2632] font-mono text-center">
                <div className="bg-[#11161D] p-2 rounded-lg border border-[#1B2632]">
                  <span className="text-[9px] text-[#7F8A99] block">Shape</span>
                  <span className="text-xs font-bold text-[#18D5E8] capitalize">{preset.params.shape}</span>
                </div>
                <div className="bg-[#11161D] p-2 rounded-lg border border-[#1B2632]">
                  <span className="text-[9px] text-[#7F8A99] block">Start</span>
                  <span className="text-xs font-bold text-[#F5F7FA]">${preset.params.startPrice.toFixed(2)}</span>
                </div>
                <div className="bg-[#11161D] p-2 rounded-lg border border-[#1B2632]">
                  <span className="text-[9px] text-[#7F8A99] block">Cap</span>
                  <span className="text-xs font-bold text-[#35E6A2]">${preset.params.graduationCap.toLocaleString()}</span>
                </div>
                <div className="bg-[#11161D] p-2 rounded-lg border border-[#1B2632]">
                  <span className="text-[9px] text-[#7F8A99] block">Fee</span>
                  <span className="text-xs font-bold text-amber-300">{preset.params.feePercentage}%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-[#1B2632] flex items-center gap-2">
              <button
                onClick={() => onLoadPreset(preset.params)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#18D5E8] hover:bg-[#45E0F0] text-[#070A0F] font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open in Curve Studio</span>
              </button>
              <button
                onClick={() => handleCopyJson(preset)}
                className="p-2 rounded-xl bg-[#11161D] hover:bg-[#1B2632] border border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA]"
                title="Copy Meteora Config JSON"
              >
                {copiedId === preset.id ? (
                  <Check className="w-4 h-4 text-[#35E6A2]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
