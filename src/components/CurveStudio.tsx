'use client';

import React, { useState, useId } from 'react';
import { 
  Play, 
  Rocket, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { CurveParameters, CurveShape, SimulationResult } from '../types';
import { calculatePriceAtSupply, generateCurvePoints, simulateDBCPurchase } from '../lib/math';

interface CurveStudioProps {
  onLaunchMeteora: (params: CurveParameters) => void;
  initialParams?: CurveParameters;
}

export const CurveStudio: React.FC<CurveStudioProps> = ({
  onLaunchMeteora,
  initialParams,
}) => {
  const gradientId = useId();
  const [params, setParams] = useState<CurveParameters>(
    initialParams || {
      startPrice: 1.00,
      graduationPrice: 4.80,
      initialLiquidity: 50000,
      graduationCap: 250000,
      feePercentage: 1.0,
      shape: 'sigmoid',
      totalTokensForSale: 100000,
      quoteToken: 'USDC',
      antiSnipeDecayHours: 48,
    }
  );

  const [assetName, setAssetName] = useState('SpaceX Secondary Share (sSPACEX)');
  const [assetType, setAssetType] = useState<'stock' | 'real-estate' | 'ai-compute' | 'commodity'>('stock');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simBuyAmount, setSimBuyAmount] = useState<number>(25000);
  const [currentProgressS, setCurrentProgressS] = useState<number>(0.25); // 25% curve sold

  // Generate curve points for SVG
  const curvePoints = generateCurvePoints(params, 60);

  // SVG Chart dimensions - Increased height and width for HERO prominence
  const svgWidth = 840;
  const svgHeight = 330;
  const padding = { top: 30, right: 35, bottom: 42, left: 65 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const minPrice = 0;
  const maxPrice = Math.max(params.graduationPrice * 1.15, params.startPrice * 1.5, 5);

  const getSvgCoordinates = (s: number, price: number) => {
    const x = padding.left + s * graphWidth;
    const y = padding.top + (1 - (price - minPrice) / (maxPrice - minPrice)) * graphHeight;
    return { x, y };
  };

  const pathD = curvePoints.reduce((acc, pt, index) => {
    const { x, y } = getSvgCoordinates(pt.s, pt.price);
    return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L ${padding.left + graphWidth} ${padding.top + graphHeight} L ${padding.left} ${padding.top + graphHeight} Z`;

  // Simulation calculations
  const simResult: SimulationResult = simulateDBCPurchase(params, currentProgressS, simBuyAmount);
  const simCurrentCoord = getSvgCoordinates(
    currentProgressS, 
    calculatePriceAtSupply(currentProgressS, params.startPrice, params.graduationPrice, params.shape)
  );
  const simNewProgressS = Math.min(1.0, currentProgressS + (simResult.tokensReceived / params.totalTokensForSale));
  const simNewCoord = getSvgCoordinates(
    simNewProgressS,
    simResult.newPrice
  );

  // Graduation Progress calculations
  const currentRaisedUsdc = Math.round(params.graduationCap * (currentProgressS + (isSimulating ? simBuyAmount / params.graduationCap : 0)));
  const currentGraduationPct = Math.min(100, Math.round((currentRaisedUsdc / params.graduationCap) * 100));
  const remainingUsdcToDamm = Math.max(0, params.graduationCap - currentRaisedUsdc);

  // AI Recommendation Logic
  const handleApplyAIRecommendation = () => {
    setParams({
      startPrice: 1.00,
      graduationPrice: 3.80,
      initialLiquidity: 75000,
      graduationCap: 250000,
      feePercentage: 0.75,
      shape: 'sigmoid',
      totalTokensForSale: 100000,
      quoteToken: 'USDC',
      antiSnipeDecayHours: 48,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header: Hierarchy & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1B2632]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#7F8A99] mb-0.5">
            <span>CURVEOS</span>
            <span>/</span>
            <span className="text-[#18D5E8]">CURVE STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F7FA]">
            Curve Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#7F8A99] font-medium">
            Figma for Bonding Curves
          </p>
        </div>

        {/* Action Buttons: Secondary Simulate + Dominant Launch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
              isSimulating
                ? 'bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/50 shadow-sm'
                : 'bg-[#0D1219] hover:bg-[#11161D] text-[#7F8A99] hover:text-[#F5F7FA] border border-[#1B2632]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'text-[#A78BFA] fill-[#A78BFA]' : ''}`} />
            <span>{isSimulating ? 'Simulating' : 'Simulate'}</span>
          </button>

          {/* Dominant Primary CTA */}
          <button
            onClick={() => onLaunchMeteora(params)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#35E6A2] hover:bg-[#5EEAB3] text-[#070A0F] font-mono text-xs font-black shadow-lg shadow-[#35E6A2]/20 hover:shadow-[#35E6A2]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Rocket className="w-4 h-4 fill-[#070A0F]" />
            <span>Launch on Meteora →</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Simplified Config (Left 4.5 cols) + Hero Curve (Right 7.5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Asset Configuration */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B2632]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#7F8A99]">
                Asset Configuration
              </span>
              <span className="text-[10px] font-mono text-[#18D5E8] bg-[#18D5E8]/10 px-2 py-0.5 rounded border border-[#18D5E8]/20">
                Meteora DBC
              </span>
            </div>

            {/* Asset Name */}
            <div>
              <label className="block text-xs font-medium text-[#7F8A99] mb-1">Asset Name / Ticker</label>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="w-full bg-[#11161D] border border-[#1B2632] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#18D5E8]/60 font-mono"
                placeholder="e.g. SpaceX Secondary Share (sSPACEX)"
              />
            </div>

            {/* Curve Shape Selection */}
            <div>
              <label className="block text-xs font-medium text-[#7F8A99] mb-1.5 flex items-center justify-between">
                <span>Curve Shape</span>
                <span className="text-[10px] font-mono text-[#18D5E8]">P(s) Formula</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sigmoid', label: 'Sigmoid', badge: 'RWA Ideal' },
                  { id: 'flat-to-quadratic', label: 'Flat-to-Quad', badge: 'Anti-Snipe' },
                  { id: 'linear', label: 'Linear', badge: 'Steady' },
                  { id: 'quadratic', label: 'Quadratic', badge: 'Momentum' },
                  { id: 'exponential', label: 'Exponential', badge: 'High Vol' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setParams({ ...params, shape: s.id as CurveShape })}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      params.shape === s.id
                        ? 'bg-[#18D5E8]/15 border-[#18D5E8]/60 text-[#18D5E8] font-bold shadow-sm'
                        : 'bg-[#11161D] border-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-[#1B2632]'
                    }`}
                  >
                    <div className="text-xs">{s.label}</div>
                    <div className="text-[9px] font-mono text-[#7F8A99]">{s.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Price Slider & Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7F8A99] font-medium">Starting Price</span>
                <span className="font-mono text-[#18D5E8] font-bold text-sm">
                  ${params.startPrice.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="50"
                step="0.10"
                value={params.startPrice}
                onChange={(e) => setParams({ ...params, startPrice: parseFloat(e.target.value) })}
                className="w-full accent-[#18D5E8] cursor-pointer"
              />
            </div>

            {/* Initial Liquidity & Graduation Target */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#7F8A99] mb-1">
                  Initial Liquidity
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={params.initialLiquidity}
                    onChange={(e) => setParams({ ...params, initialLiquidity: Number(e.target.value) })}
                    className="w-full bg-[#11161D] border border-[#1B2632] rounded-xl px-2.5 py-1.5 text-xs text-[#F5F7FA] font-mono"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-[#7F8A99] font-mono">USDC</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#7F8A99] mb-1">
                  Graduation Target
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={params.graduationCap}
                    onChange={(e) => setParams({ ...params, graduationCap: Number(e.target.value) })}
                    className="w-full bg-[#11161D] border border-[#1B2632] rounded-xl px-2.5 py-1.5 text-xs text-[#F5F7FA] font-mono"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-[#7F8A99] font-mono">USDC</span>
                </div>
              </div>
            </div>

            {/* Graduation Target Price */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7F8A99] font-medium">Graduation Price (DAMM Migration)</span>
                <span className="font-mono text-[#35E6A2] font-bold text-sm">
                  ${params.graduationPrice.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={Math.max(params.startPrice * 1.1, 1)}
                max="200"
                step="0.5"
                value={params.graduationPrice}
                onChange={(e) => setParams({ ...params, graduationPrice: parseFloat(e.target.value) })}
                className="w-full accent-green cursor-pointer"
              />
            </div>

            {/* Advanced Settings Accordion */}
            <div className="pt-2 border-t border-[#1B2632]">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-xs font-mono font-semibold text-[#7F8A99] hover:text-[#F5F7FA] py-1 transition-colors"
              >
                <span>Advanced Parameters</span>
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showAdvanced && (
                <div className="mt-3 space-y-3 p-3 rounded-xl bg-[#11161D] border border-[#1B2632] text-xs font-mono animate-in fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#7F8A99] mb-1">Base Fee %</label>
                      <input
                        type="number"
                        step="0.1"
                        value={params.feePercentage}
                        onChange={(e) => setParams({ ...params, feePercentage: parseFloat(e.target.value) })}
                        className="w-full bg-[#0D1219] border border-[#1B2632] rounded-lg px-2 py-1 text-xs text-[#F5F7FA]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#7F8A99] mb-1">Anti-Snipe Decay</label>
                      <select
                        value={params.antiSnipeDecayHours}
                        onChange={(e) => setParams({ ...params, antiSnipeDecayHours: Number(e.target.value) })}
                        className="w-full bg-[#0D1219] border border-[#1B2632] rounded-lg px-2 py-1 text-xs text-[#F5F7FA]"
                      >
                        <option value={12}>12 Hours</option>
                        <option value={24}>24 Hours</option>
                        <option value={48}>48 Hours</option>
                        <option value={72}>72 Hours</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#7F8A99] mb-1">Quote Token Mint</label>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-[#0D1219] text-[#18D5E8] border border-[#1B2632] text-[10px]">
                        USDC (Solana Native)
                      </span>
                      <span className="text-[10px] text-[#7F8A99]">EPjFWdd5AufqSSqe...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Hero Live Dynamic Bonding Curve Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Visual Curve Canvas Card */}
          <div className="bg-[#0D1219] rounded-2xl border border-[#1B2632] p-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B2632]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#18D5E8] animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-[#F5F7FA] tracking-wider">
                  Live Dynamic Bonding Curve
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7F8A99]">
                <span>Curve: <strong className="text-[#18D5E8] capitalize">{params.shape}</strong></span>
                <span>·</span>
                <span>Par: <strong className="text-[#F5F7FA]">${params.startPrice.toFixed(2)} → ${params.graduationPrice.toFixed(2)}</strong></span>
              </div>
            </div>

            {/* SVG Visualizer Canvas */}
            <div className="relative mt-3 bg-[#070A0F] rounded-xl border border-[#1B2632] p-2 overflow-x-auto">
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full h-auto min-w-[550px]"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#18D5E8" stopOpacity="0.30" />
                    <stop offset="70%" stopColor="#18D5E8" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#070A0F" stopOpacity="0.0" />
                  </linearGradient>

                  <pattern id="grid-pattern" width="45" height="45" patternUnits="userSpaceOnUse">
                    <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#1B2632" strokeWidth="0.8" opacity="0.6" />
                  </pattern>
                </defs>

                {/* Grid */}
                <rect 
                  x={padding.left} 
                  y={padding.top} 
                  width={graphWidth} 
                  height={graphHeight} 
                  fill="url(#grid-pattern)" 
                />

                {/* Axes */}
                <line 
                  x1={padding.left} 
                  y1={padding.top + graphHeight} 
                  x2={padding.left + graphWidth} 
                  y2={padding.top + graphHeight} 
                  stroke="#1B2632" 
                  strokeWidth="1.5" 
                />
                <line 
                  x1={padding.left} 
                  y1={padding.top} 
                  x2={padding.left} 
                  y2={padding.top + graphHeight} 
                  stroke="#1B2632" 
                  strokeWidth="1.5" 
                />

                {/* Horizontal price guide lines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                  const pVal = minPrice + (maxPrice - minPrice) * frac;
                  const yPos = padding.top + (1 - frac) * graphHeight;
                  return (
                    <g key={idx}>
                      <line 
                        x1={padding.left} 
                        y1={yPos} 
                        x2={padding.left + graphWidth} 
                        y2={yPos} 
                        stroke="#1B2632" 
                        strokeDasharray="3 3" 
                      />
                      <text 
                        x={padding.left - 8} 
                        y={yPos + 4} 
                        textAnchor="end" 
                        fontSize="10" 
                        fill="#7F8A99" 
                        fontFamily="monospace"
                      >
                        ${pVal.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1.0].map((sVal, idx) => {
                  const xPos = padding.left + sVal * graphWidth;
                  return (
                    <g key={idx}>
                      <text 
                        x={xPos} 
                        y={padding.top + graphHeight + 18} 
                        textAnchor="middle" 
                        fontSize="10" 
                        fill="#7F8A99" 
                        fontFamily="monospace"
                      >
                        {Math.round(sVal * 100)}%
                      </text>
                    </g>
                  );
                })}

                {/* Area fill */}
                <path d={areaD} fill={`url(#${gradientId})`} />

                {/* Dynamic Bonding Curve Stroke (Primary Cyan #18D5E8) */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke="#18D5E8" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Start Price Marker */}
                {(() => {
                  const startCoord = getSvgCoordinates(0, params.startPrice);
                  return (
                    <g>
                      <circle cx={startCoord.x} cy={startCoord.y} r="5" fill="#18D5E8" />
                      <text x={startCoord.x + 8} y={startCoord.y - 8} fill="#18D5E8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        Start ${params.startPrice.toFixed(2)}
                      </text>
                    </g>
                  );
                })()}

                {/* Graduation Point Marker (Success Green #35E6A2) */}
                {(() => {
                  const gradCoord = getSvgCoordinates(1.0, params.graduationPrice);
                  return (
                    <g>
                      <circle cx={gradCoord.x} cy={gradCoord.y} r="6" fill="#35E6A2" />
                      <circle cx={gradCoord.x} cy={gradCoord.y} r="12" fill="none" stroke="#35E6A2" strokeOpacity="0.4" className="animate-ping" />
                      <text x={gradCoord.x - 10} y={gradCoord.y - 12} textAnchor="end" fill="#35E6A2" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        DAMM v2 Graduation (${params.graduationPrice.toFixed(2)})
                      </text>
                    </g>
                  );
                })()}

                {/* Simulation Marker (if active) */}
                {isSimulating && (
                  <g>
                    <line 
                      x1={simCurrentCoord.x} 
                      y1={simCurrentCoord.y} 
                      x2={simNewCoord.x} 
                      y2={simNewCoord.y} 
                      stroke="#A78BFA" 
                      strokeWidth="3" 
                      strokeDasharray="4 4"
                    />
                    <circle cx={simCurrentCoord.x} cy={simCurrentCoord.y} r="5" fill="#F5F7FA" />
                    <circle cx={simNewCoord.x} cy={simNewCoord.y} r="6" fill="#A78BFA" />
                    <text x={simNewCoord.x + 8} y={simNewCoord.y - 8} fill="#A78BFA" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Simulated Impact: ${simResult.newPrice.toFixed(2)} (+{simResult.priceImpact}%)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Item 8: Real Graduation Progress Meter → Meteora DAMM v2 */}
            <div className="mt-4 p-4 rounded-xl bg-[#11161D] border border-[#1B2632] space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#F5F7FA] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#35E6A2]" />
                  Graduation Progress → Meteora DAMM v2
                </span>
                <span className="text-[#35E6A2] font-bold">
                  ${(currentRaisedUsdc / 1000).toFixed(0)}K / ${(params.graduationCap / 1000).toFixed(0)}K ({currentGraduationPct}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-[#070A0F] overflow-hidden border border-[#1B2632]">
                <div
                  className="h-full bg-gradient-to-r from-[#18D5E8] to-[#35E6A2] transition-all duration-300"
                  style={{ width: `${currentGraduationPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#7F8A99]">
                <span>Automated liquidity migration trigger</span>
                <span className="text-[#F5F7FA]">${(remainingUsdcToDamm / 1000).toFixed(0)}K remaining to permanent DAMM pool</span>
              </div>
            </div>

          </div>

          {/* Simulation Drawer (if active) */}
          {isSimulating && (
            <div className="bg-[#0D1219] rounded-2xl border border-[#A78BFA]/40 p-5 shadow-2xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#1B2632]">
                <div className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-[#A78BFA] fill-[#A78BFA]" />
                  <span className="font-mono text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
                    Dynamic Slippage & Liquidity Simulator
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#A78BFA] bg-[#A78BFA]/10 px-2 py-0.5 rounded border border-[#A78BFA]/30">
                  Numerical Integration
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#7F8A99]">Simulate Buy Order</span>
                    <span className="text-[#A78BFA] font-bold">${simBuyAmount.toLocaleString()} USDC</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max={Math.min(100000, params.graduationCap)}
                    step="1000"
                    value={simBuyAmount}
                    onChange={(e) => setSimBuyAmount(Number(e.target.value))}
                    className="w-full accent-purple cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#7F8A99]">Curve Position</span>
                    <span className="text-[#F5F7FA] font-bold">{Math.round(currentProgressS * 100)}% Fulfilled</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.9"
                    step="0.05"
                    value={currentProgressS}
                    onChange={(e) => setCurrentProgressS(parseFloat(e.target.value))}
                    className="w-full accent-[#7F8A99] cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
                <div className="bg-[#11161D] p-2.5 rounded-xl border border-[#1B2632]">
                  <span className="text-[10px] text-[#7F8A99] block">Tokens Received</span>
                  <span className="text-sm font-bold text-[#F5F7FA]">{simResult.tokensReceived.toLocaleString()}</span>
                </div>
                <div className="bg-[#11161D] p-2.5 rounded-xl border border-[#1B2632]">
                  <span className="text-[10px] text-[#7F8A99] block">Effective Price</span>
                  <span className="text-sm font-bold text-[#18D5E8]">${simResult.effectivePrice.toFixed(3)}</span>
                </div>
                <div className="bg-[#11161D] p-2.5 rounded-xl border border-[#1B2632]">
                  <span className="text-[10px] text-[#7F8A99] block">Slippage Impact</span>
                  <span className="text-sm font-bold text-amber-300">+{simResult.priceImpact.toFixed(2)}%</span>
                </div>
                <div className="bg-[#11161D] p-2.5 rounded-xl border border-[#1B2632]">
                  <span className="text-[10px] text-[#7F8A99] block">To DAMM Pool</span>
                  <span className="text-sm font-bold text-[#35E6A2]">${simResult.remainingToGraduation.toLocaleString()} USDC</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Item 5: Actionable & Visual "AI Curve Architect" Card (Full Width Below Grid) */}
      <div className="bg-[#0D1219] rounded-2xl border border-[#A78BFA]/40 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1B2632]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#A78BFA]/15 text-[#A78BFA]">
              <Sparkles className="w-5 h-5 text-[#A78BFA]" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-[#F5F7FA] flex items-center gap-2">
                <span>AI Curve Architect</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/30">
                  Quantitative Optimization
                </span>
              </h3>
              <p className="text-xs text-[#7F8A99]">
                Recommended Configuration: <strong className="text-[#F5F7FA]">Sigmoid (S-Curve)</strong> · Best for: <span className="text-[#18D5E8]">RWA & Tokenized Equity</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyAIRecommendation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A78BFA] hover:bg-[#C4B5FD] text-[#070A0F] font-mono text-xs font-bold transition-all shadow-md shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#070A0F]" />
            <span>Apply AI Recommendation</span>
          </button>
        </div>

        {/* Visual Metric Bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          
          <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632] space-y-1.5">
            <div className="flex justify-between text-[#7F8A99] text-[11px]">
              <span>Price Stability</span>
              <span className="text-[#35E6A2] font-bold">85%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#070A0F]">
              <div className="h-full bg-[#35E6A2] rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="text-[10px] text-[#7F8A99] block">Prevents sniper volatility</span>
          </div>

          <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632] space-y-1.5">
            <div className="flex justify-between text-[#7F8A99] text-[11px]">
              <span>Early Liquidity</span>
              <span className="text-[#18D5E8] font-bold">72%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#070A0F]">
              <div className="h-full bg-[#18D5E8] rounded-full" style={{ width: '72%' }} />
            </div>
            <span className="text-[10px] text-[#7F8A99] block">Fair OTC par entry</span>
          </div>

          <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632] space-y-1.5">
            <div className="flex justify-between text-[#7F8A99] text-[11px]">
              <span>Volatility Control</span>
              <span className="text-[#A78BFA] font-bold">88%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#070A0F]">
              <div className="h-full bg-[#A78BFA] rounded-full" style={{ width: '88%' }} />
            </div>
            <span className="text-[10px] text-[#7F8A99] block">Dampened slope ramp</span>
          </div>

          <div className="bg-[#11161D] p-3 rounded-xl border border-[#1B2632] space-y-1.5">
            <div className="flex justify-between text-[#7F8A99] text-[11px]">
              <span>Graduation Efficiency</span>
              <span className="text-[#35E6A2] font-bold">94%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#070A0F]">
              <div className="h-full bg-[#35E6A2] rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-[10px] text-[#7F8A99] block">Seamless DAMM v2 migration</span>
          </div>

        </div>
      </div>

    </div>
  );
};
