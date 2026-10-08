'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  Code2
} from 'lucide-react';
import { CurveParameters, CurveShape } from '../types';

interface AICurveArchitectProps {
  onLoadIntoStudio: (params: CurveParameters) => void;
  onDeployDirect: (params: CurveParameters) => void;
}

export const AICurveArchitect: React.FC<AICurveArchitectProps> = ({
  onLoadIntoStudio,
  onDeployDirect,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    assetName: string;
    category: string;
    riskScore: number;
    recommendedShape: CurveShape;
    rationale: string;
    params: CurveParameters;
    transferHook: string;
    dammTargetCap: number;
  } | null>({
    assetName: 'SpaceX Series N Secondary Equity',
    category: 'StockFlow Pre-IPO Stock',
    riskScore: 28,
    recommendedShape: 'sigmoid',
    rationale: 'For institutional secondary equity, an aggressive curve causes early liquidity cliffs. A dampened Sigmoid (S-Curve) provides orderly price discovery, mirrors OTC secondary desks, and protects market depth before Meteora DAMM graduation.',
    params: {
      startPrice: 110.00,
      graduationPrice: 145.00,
      initialLiquidity: 100000,
      graduationCap: 500000,
      feePercentage: 0.75,
      shape: 'sigmoid',
      totalTokensForSale: 25000,
      quoteToken: 'USDC',
      antiSnipeDecayHours: 48,
    },
    transferHook: 'Rule 144 Secondary Transfer Hook (KYC & Accredited Investor Only)',
    dammTargetCap: 500000,
  });

  const handleGenerate = (customPrompt?: string) => {
    const text = customPrompt || prompt;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let res;

      if (lower.includes('real estate') || lower.includes('hotel') || lower.includes('property') || lower.includes('building')) {
        res = {
          assetName: 'Miami Brickell Luxury Commercial Tower',
          category: 'RWA Real Estate',
          riskScore: 18,
          recommendedShape: 'flat-to-quadratic' as CurveShape,
          rationale: 'Physical real estate cap rates cannot tolerate exponential volatility. A flat-to-quadratic curve ensures fair initial fractional pricing for local retail investors while locking institutional yield stability before graduating to Meteora DAMM.',
          params: {
            startPrice: 20.00,
            graduationPrice: 26.50,
            initialLiquidity: 150000,
            graduationCap: 750000,
            feePercentage: 0.50,
            shape: 'flat-to-quadratic' as CurveShape,
            totalTokensForSale: 50000,
            quoteToken: 'USDC' as const,
            antiSnipeDecayHours: 72,
          },
          transferHook: 'Rental Yield Distribution Hook via Solana Token-2022',
          dammTargetCap: 750000,
        };
      } else if (lower.includes('ai') || lower.includes('compute') || lower.includes('gpu') || lower.includes('agent')) {
        res = {
          assetName: 'Autonomous AI Agent Cluster & H100 Compute',
          category: 'AI Asset & Compute Quota',
          riskScore: 65,
          recommendedShape: 'quadratic' as CurveShape,
          rationale: 'Decentralized compute demand is cyclical and velocity-driven. A quadratic bonding curve rewards early hardware underwriters and quickly builds a deep permanent liquidity reservoir for inference query microtransactions on Meteora DAMM.',
          params: {
            startPrice: 0.50,
            graduationPrice: 3.20,
            initialLiquidity: 40000,
            graduationCap: 200000,
            feePercentage: 1.50,
            shape: 'quadratic' as CurveShape,
            totalTokensForSale: 500000,
            quoteToken: 'USDC' as const,
            antiSnipeDecayHours: 12,
          },
          transferHook: 'Burn-to-Infer Compute Protocol Access Voucher',
          dammTargetCap: 200000,
        };
      } else if (lower.includes('gold') || lower.includes('commodity') || lower.includes('silver')) {
        res = {
          assetName: 'Zurich Vault Allocated Bullion (cGOLD)',
          category: 'RWA Commodity',
          riskScore: 12,
          recommendedShape: 'linear' as CurveShape,
          rationale: 'Physical commodity pegs must track benchmark LBMA gold fixing tightly. A low-fee linear curve prevents arbitrage distortion and smoothly bridges vault supply to on-chain automated market maker liquidity.',
          params: {
            startPrice: 65.00,
            graduationPrice: 71.00,
            initialLiquidity: 200000,
            graduationCap: 1000000,
            feePercentage: 0.25,
            shape: 'linear' as CurveShape,
            totalTokensForSale: 15000,
            quoteToken: 'USDC' as const,
            antiSnipeDecayHours: 24,
          },
          transferHook: 'Physical Bullion Redemption Attestation (Loomis Vault)',
          dammTargetCap: 1000000,
        };
      } else {
        res = {
          assetName: 'Anthropic Series C Secondary Stock',
          category: 'StockFlow Pre-IPO Stock',
          riskScore: 32,
          recommendedShape: 'sigmoid' as CurveShape,
          rationale: 'Secondary private tech equity requires bounded price bands. The AI Curve Engine specifies a Sigmoid curve to prevent speculative volatility spikes and ensure orderly capital formation.',
          params: {
            startPrice: 45.00,
            graduationPrice: 78.00,
            initialLiquidity: 80000,
            graduationCap: 400000,
            feePercentage: 0.80,
            shape: 'sigmoid' as CurveShape,
            totalTokensForSale: 10000,
            quoteToken: 'USDC' as const,
            antiSnipeDecayHours: 48,
          },
          transferHook: 'Rule 144 / Reg D Investor Qualification Hook',
          dammTargetCap: 400000,
        };
      }

      setAnalysisResult(res);
      setIsAnalyzing(false);
    }, 700);
  };

  const samplePrompts = [
    'Pre-IPO secondary shares of Stripe with $100k starting USDC and orderly secondary discovery',
    'Tokenize a $5M boutique luxury hotel in Miami with quarterly rental distributions',
    'Decentralized cluster of 128 NVIDIA H100 GPUs with inference utility tokens',
    'Vault-allocated physical gold with tight spreads and instant DAMM liquidity graduation',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#1B2632]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#A78BFA]/15 text-[#A78BFA] border border-[#A78BFA]/30">
            <Sparkles className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#F5F7FA] flex items-center gap-2">
              AI Curve Architect
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#A78BFA]/20 border border-[#A78BFA]/30 text-[#A78BFA]">
                Prompt-to-DBC
              </span>
            </h1>
            <p className="text-xs text-[#7F8A99]">
              Describe any physical or tokenized asset in natural language. Our AI calculates optimal Meteora DBC math, fee decay schedules, and graduation triggers.
            </p>
          </div>
        </div>
      </div>

      {/* Prompt Input Section */}
      <div className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-2xl space-y-4">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7F8A99]">
          Describe your Asset & Launch Goals
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. I want to tokenize secondary shares of SpaceX at a $210B valuation with $100k initial USDC liquidity, conservative volatility protection, and automated migration to Meteora DAMM v2..."
            className="w-full bg-[#11161D] border border-[#1B2632] rounded-xl p-3 text-sm text-[#F5F7FA] placeholder-[#7F8A99] focus:outline-none focus:border-[#A78BFA]/60 font-sans"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={isAnalyzing}
            className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#A78BFA] hover:bg-[#C4B5FD] text-[#070A0F] font-mono text-xs font-black shadow-md transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#070A0F] border-t-transparent rounded-full animate-spin" />
                <span>ARCHITECTING CURVE...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 fill-[#070A0F]" />
                <span>GENERATE METEORA DBC</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] font-mono text-[#7F8A99]">Quick Presets:</span>
          {samplePrompts.map((pText, i) => (
            <button
              key={i}
              onClick={() => {
                setPrompt(pText);
                handleGenerate(pText);
              }}
              className="text-[11px] font-sans px-2.5 py-1 rounded-lg bg-[#11161D] hover:bg-[#1B2632] border border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA] transition-all text-left"
            >
              {pText.slice(0, 42)}...
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Output Results */}
      {analysisResult && (
        <div className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1B2632]">
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs px-2 py-0.5 rounded bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30">
                  {analysisResult.category}
                </span>
                <span className="text-xs text-[#7F8A99]">Risk Score:</span>
                <span className="text-xs font-bold text-[#35E6A2]">{analysisResult.riskScore}/100 (Institutional Low Risk)</span>
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA] mt-1">
                {analysisResult.assetName}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onLoadIntoStudio(analysisResult.params)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#18D5E8]/10 hover:bg-[#18D5E8]/20 border border-[#18D5E8]/40 text-[#18D5E8] font-mono text-xs font-bold transition-all"
              >
                <Sliders className="w-4 h-4" />
                <span>Open in Curve Studio</span>
              </button>
              <button
                onClick={() => onDeployDirect(analysisResult.params)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#35E6A2] hover:bg-[#5EEAB3] text-[#070A0F] font-mono text-xs font-black shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Deploy to Meteora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rationale */}
          <div className="bg-[#11161D] border border-[#1B2632] rounded-xl p-4 space-y-2">
            <span className="text-xs font-mono font-bold text-[#A78BFA] uppercase tracking-wide flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> AI Quantitative Rationale
            </span>
            <p className="text-xs text-[#F5F7FA] leading-relaxed">
              {analysisResult.rationale}
            </p>
          </div>

          {/* Optimal Parameter Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632]">
              <span className="text-[10px] text-[#7F8A99] block mb-1">Recommended Shape</span>
              <span className="text-sm font-bold text-[#18D5E8] capitalize">{analysisResult.recommendedShape}</span>
              <span className="text-[10px] text-[#7F8A99] block mt-1">Orderly corridor</span>
            </div>

            <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632]">
              <span className="text-[10px] text-[#7F8A99] block mb-1">Starting Price</span>
              <span className="text-sm font-bold text-[#F5F7FA]">${analysisResult.params.startPrice.toFixed(2)}</span>
              <span className="text-[10px] text-[#7F8A99] block mt-1">Initial par value</span>
            </div>

            <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632]">
              <span className="text-[10px] text-[#7F8A99] block mb-1">DAMM Graduation Cap</span>
              <span className="text-sm font-bold text-[#35E6A2]">${analysisResult.params.graduationCap.toLocaleString()}</span>
              <span className="text-[10px] text-[#7F8A99] block mt-1">Pool migration trigger</span>
            </div>

            <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632]">
              <span className="text-[10px] text-[#7F8A99] block mb-1">Base Fee / Anti-Snipe</span>
              <span className="text-sm font-bold text-amber-300">{analysisResult.params.feePercentage}% / {analysisResult.params.antiSnipeDecayHours}h decay</span>
              <span className="text-[10px] text-[#7F8A99] block mt-1">Decaying bot penalty</span>
            </div>
          </div>

          {/* Compliance & Meteora DBC Instruction Payload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#11161D] p-3.5 rounded-xl border border-[#1B2632] space-y-2">
              <span className="font-bold block flex items-center gap-1.5 text-[#35E6A2]">
                <ShieldCheck className="w-4 h-4" /> Solana Token-2022 Transfer Hook
              </span>
              <p className="text-[#7F8A99] text-[11px]">
                {analysisResult.transferHook}
              </p>
              <div className="text-[10px] text-[#7F8A99] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#35E6A2]" /> Compliant with SEC Reg D / Reg S & MiCA
              </div>
            </div>

            <div className="bg-[#11161D] p-3.5 rounded-xl border border-[#1B2632] space-y-2">
              <span className="font-bold block flex items-center gap-1.5 text-[#18D5E8]">
                <Code2 className="w-4 h-4" /> Generated Meteora DBC Payload
              </span>
              <pre className="text-[10px] text-[#18D5E8]/90 overflow-x-auto bg-[#070A0F] p-2 rounded border border-[#1B2632] font-mono">
{JSON.stringify({
  program: "DBC1111111111111111111111111111111111111111",
  quote_mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  curve_type: analysisResult.recommendedShape,
  init_quote_reserve: analysisResult.params.initialLiquidity,
  migration_target: "DAMM_V2_METEORA",
  migration_threshold_usdc: analysisResult.params.graduationCap
}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
