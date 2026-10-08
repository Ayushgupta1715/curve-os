export type CurveShape = 'linear' | 'exponential' | 'quadratic' | 'sigmoid' | 'flat-to-quadratic';

export type AssetCategory = 'stock' | 'real-estate' | 'commodity' | 'private-equity' | 'ai-compute';

export interface CurveParameters {
  startPrice: number;        // e.g. $1.00
  graduationPrice: number;   // e.g. $5.00
  initialLiquidity: number;  // e.g. $50,000 USDC
  graduationCap: number;     // e.g. $250,000 USDC
  feePercentage: number;     // e.g. 1.0%
  shape: CurveShape;
  totalTokensForSale: number;// e.g. 1,000,000
  quoteToken: 'USDC' | 'USDT' | 'SOL';
  antiSnipeDecayHours: number; // e.g. 24 hours fee decay
}

export interface DBCPreset {
  id: string;
  name: string;
  category: AssetCategory;
  description: string;
  badge: string;
  author: string;
  downloads: number;
  params: CurveParameters;
  reasoning: string;
}

export interface RWAAsset {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  badge: string;
  icon: string;
  valuation: number;
  currentPrice: number;
  targetPrice: number;
  raisedUsdc: number;
  graduationTarget: number;
  isGraduated: boolean;
  dammPoolAddress?: string;
  curveShape: CurveShape;
  backingDoc: string;
  transferHookRule: string;
  description: string;
}

export interface SimulationResult {
  simulatedBuyAmount: number;
  tokensReceived: number;
  effectivePrice: number;
  priceImpact: number;
  newPrice: number;
  progressPercent: number;
  remainingToGraduation: number;
}
