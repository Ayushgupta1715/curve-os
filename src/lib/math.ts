import { CurveParameters, CurveShape, SimulationResult } from '../types';

export function calculatePriceAtSupply(
  s: number, // 0.0 to 1.0 (progress of curve tokens sold)
  startPrice: number,
  graduationPrice: number,
  shape: CurveShape
): number {
  const clampedS = Math.max(0, Math.min(1, s));
  const delta = graduationPrice - startPrice;

  switch (shape) {
    case 'linear':
      return startPrice + delta * clampedS;

    case 'exponential': {
      if (startPrice <= 0) return 0;
      const ratio = graduationPrice / Math.max(0.0001, startPrice);
      return startPrice * Math.pow(ratio, clampedS);
    }

    case 'quadratic':
      return startPrice + delta * Math.pow(clampedS, 2);

    case 'sigmoid': {
      // S-curve centered at 0.5 with steepness 8
      const rawSigmoid = 1 / (1 + Math.exp(-8 * (clampedS - 0.5)));
      const minS = 1 / (1 + Math.exp(4)); // at s=0
      const maxS = 1 / (1 + Math.exp(-4)); // at s=1
      const normalized = (rawSigmoid - minS) / (maxS - minS);
      return startPrice + delta * normalized;
    }

    case 'flat-to-quadratic': {
      if (clampedS < 0.25) {
        // Fair distribution phase (nearly flat, +5% slope)
        return startPrice + delta * 0.05 * (clampedS / 0.25);
      } else {
        // Momentum phase
        const subS = (clampedS - 0.25) / 0.75;
        return startPrice + delta * 0.05 + delta * 0.95 * Math.pow(subS, 1.8);
      }
    }

    default:
      return startPrice + delta * clampedS;
  }
}

/**
 * Generate 50 sample points for SVG rendering
 */
export function generateCurvePoints(
  params: CurveParameters,
  steps: number = 60
): { s: number; price: number; usdcCost: number }[] {
  const points: { s: number; price: number; usdcCost: number }[] = [];
  let cumulativeCost = 0;

  for (let i = 0; i <= steps; i++) {
    const s = i / steps;
    const price = calculatePriceAtSupply(s, params.startPrice, params.graduationPrice, params.shape);
    if (i > 0) {
      const prevPrice = points[i - 1].price;
      const avgPrice = (price + prevPrice) / 2;
      const tokenFraction = (1 / steps) * params.totalTokensForSale;
      cumulativeCost += avgPrice * tokenFraction;
    }
    points.push({ s, price, usdcCost: cumulativeCost });
  }

  return points;
}

/**
 * Simulate buying $USDC amount into the curve at current progress
 */
export function simulateDBCPurchase(
  params: CurveParameters,
  currentProgressS: number, // 0.0 to 1.0
  spendUsdc: number
): SimulationResult {
  const currentPrice = calculatePriceAtSupply(
    currentProgressS,
    params.startPrice,
    params.graduationPrice,
    params.shape
  );

  // Approximate tokens by piecewise numerical integration
  let remainingUsdc = spendUsdc * (1 - params.feePercentage / 100);
  let accumulatedTokens = 0;
  let testS = currentProgressS;
  const stepTokens = params.totalTokensForSale / 500;

  while (remainingUsdc > 0 && testS < 1.0) {
    const p = calculatePriceAtSupply(testS, params.startPrice, params.graduationPrice, params.shape);
    const costForStep = p * stepTokens;
    if (costForStep <= remainingUsdc) {
      remainingUsdc -= costForStep;
      accumulatedTokens += stepTokens;
      testS += stepTokens / params.totalTokensForSale;
    } else {
      const frac = remainingUsdc / costForStep;
      accumulatedTokens += stepTokens * frac;
      testS += (stepTokens * frac) / params.totalTokensForSale;
      remainingUsdc = 0;
      break;
    }
  }

  const newPrice = calculatePriceAtSupply(testS, params.startPrice, params.graduationPrice, params.shape);
  const effectivePrice = accumulatedTokens > 0 ? spendUsdc / accumulatedTokens : currentPrice;
  const priceImpact = ((newPrice - currentPrice) / Math.max(0.0001, currentPrice)) * 100;
  const progressPercent = Math.min(100, testS * 100);
  const totalCurveQuoteTarget = params.graduationCap;
  const currentQuoteAccumulated = currentProgressS * totalCurveQuoteTarget;
  const remainingToGraduation = Math.max(0, totalCurveQuoteTarget - (currentQuoteAccumulated + spendUsdc));

  return {
    simulatedBuyAmount: spendUsdc,
    tokensReceived: Math.round(accumulatedTokens * 100) / 100,
    effectivePrice: Math.round(effectivePrice * 1000) / 1000,
    priceImpact: Math.round(priceImpact * 100) / 100,
    newPrice: Math.round(newPrice * 1000) / 1000,
    progressPercent: Math.round(progressPercent * 10) / 10,
    remainingToGraduation: Math.round(remainingToGraduation),
  };
}
