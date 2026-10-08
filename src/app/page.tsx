'use client';

import React, { useState } from 'react';
import { Navbar, ActiveTab } from '../components/Navbar';
import { CurveStudio } from '../components/CurveStudio';
import { AICurveArchitect } from '../components/AICurveArchitect';
import { StockFlow } from '../components/StockFlow';
import { RWALaunches } from '../components/RWALaunches';
import { AIAssets } from '../components/AIAssets';
import { CurveMarketplace } from '../components/CurveMarketplace';
import { TradingTerminal } from '../components/TradingTerminal';
import { MeteoraLaunchModal } from '../components/MeteoraLaunchModal';
import { INITIAL_ASSETS } from '../data/assets';
import { CurveParameters, RWAAsset } from '../types';
import confetti from 'canvas-confetti';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('studio');
  const [walletBalance, setWalletBalance] = useState<number>(25000); // 25,000 USDC default
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(true);
  const [assets, setAssets] = useState<RWAAsset[]>(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<RWAAsset>(INITIAL_ASSETS[0]);
  
  // Studio Params
  const [studioParams, setStudioParams] = useState<CurveParameters>({
    startPrice: 1.00,
    graduationPrice: 4.80,
    initialLiquidity: 50000,
    graduationCap: 250000,
    feePercentage: 1.0,
    shape: 'sigmoid',
    totalTokensForSale: 100000,
    quoteToken: 'USDC',
    antiSnipeDecayHours: 48,
  });

  // Launch Modal State
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [pendingLaunchParams, setPendingLaunchParams] = useState<CurveParameters>(studioParams);

  // Faucet
  const handleFaucet = () => {
    setWalletBalance((prev) => prev + 10000);
    try {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.1, x: 0.85 },
      });
    } catch (e) {}
  };

  // Open Studio with specific parameters
  const handleOpenInStudio = (params: CurveParameters) => {
    setStudioParams(params);
    setActiveTab('studio');
  };

  // Open Studio from Asset
  const handleOpenAssetInStudio = (asset: RWAAsset) => {
    setStudioParams({
      startPrice: asset.currentPrice,
      graduationPrice: asset.targetPrice,
      initialLiquidity: asset.raisedUsdc,
      graduationCap: asset.graduationTarget,
      feePercentage: 0.75,
      shape: asset.curveShape,
      totalTokensForSale: 100000,
      quoteToken: 'USDC',
      antiSnipeDecayHours: 48,
    });
    setActiveTab('studio');
  };

  // Open Trading Terminal for Asset
  const handleTradeAsset = (asset: RWAAsset) => {
    setSelectedAsset(asset);
    setActiveTab('terminal');
  };

  // Launch on Meteora Trigger
  const handleTriggerLaunch = (params: CurveParameters) => {
    setPendingLaunchParams(params);
    setIsLaunchModalOpen(true);
  };

  // On Launch Success
  const handleLaunchSuccess = (newAsset: RWAAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    setSelectedAsset(newAsset);
  };

  // Execute Trade in Terminal
  const handleExecuteTrade = (assetId: string, isBuy: boolean, amountUsdc: number) => {
    const target = assets.find((a) => a.id === assetId);
    if (!target) return { success: false, tokens: 0, graduated: false };

    if (isBuy && walletBalance < amountUsdc) {
      alert("Insufficient USDC wallet balance! Click '+10k USDC' faucet in the top right.");
      return { success: false, tokens: 0, graduated: false };
    }

    const tokens = Math.round((amountUsdc / target.currentPrice) * 100) / 100;
    const newRaised = isBuy ? target.raisedUsdc + amountUsdc : Math.max(0, target.raisedUsdc - amountUsdc);
    const priceDelta = isBuy ? (amountUsdc / target.graduationTarget) * (target.targetPrice - target.currentPrice) * 0.5 : -0.1;
    const newPrice = Math.max(0.1, target.currentPrice + priceDelta);
    const graduated = newRaised >= target.graduationTarget && !target.isGraduated;

    if (isBuy) {
      setWalletBalance((w) => w - amountUsdc);
    } else {
      setWalletBalance((w) => w + amountUsdc);
    }

    setAssets((prev) =>
      prev.map((a) => {
        if (a.id === assetId) {
          return {
            ...a,
            raisedUsdc: newRaised,
            currentPrice: Math.round(newPrice * 100) / 100,
            isGraduated: a.isGraduated || graduated,
            dammPoolAddress: graduated ? `DAMM2-${a.ticker}-USDC-MIGRATED` : a.dammPoolAddress,
          };
        }
        return a;
      })
    );

    // Update selected asset
    setSelectedAsset((prev) => ({
      ...prev,
      raisedUsdc: newRaised,
      currentPrice: Math.round(newPrice * 100) / 100,
      isGraduated: prev.isGraduated || graduated,
      dammPoolAddress: graduated ? `DAMM2-${prev.ticker}-USDC-MIGRATED` : prev.dammPoolAddress,
    }));

    if (graduated) {
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }

    return { success: true, tokens, graduated };
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070A0F] bg-grid-subtle selection:bg-[#18D5E8]/20 text-[#F5F7FA]">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        walletBalance={walletBalance}
        onFaucetClick={handleFaucet}
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'studio' && (
          <CurveStudio
            key={JSON.stringify(studioParams)}
            initialParams={studioParams}
            onLaunchMeteora={handleTriggerLaunch}
          />
        )}

        {activeTab === 'architect' && (
          <AICurveArchitect
            onLoadIntoStudio={handleOpenInStudio}
            onDeployDirect={handleTriggerLaunch}
          />
        )}

        {activeTab === 'stockflow' && (
          <StockFlow
            assets={assets}
            onSelectAssetToTrade={handleTradeAsset}
            onOpenInStudio={handleOpenAssetInStudio}
          />
        )}

        {activeTab === 'rwa' && (
          <RWALaunches
            assets={assets}
            onSelectAssetToTrade={handleTradeAsset}
            onOpenInStudio={handleOpenAssetInStudio}
          />
        )}

        {activeTab === 'ai-assets' && (
          <AIAssets
            assets={assets}
            onSelectAssetToTrade={handleTradeAsset}
            onOpenInStudio={handleOpenAssetInStudio}
          />
        )}

        {activeTab === 'marketplace' && (
          <CurveMarketplace
            onLoadPreset={handleOpenInStudio}
          />
        )}

        {activeTab === 'terminal' && (
          <TradingTerminal
            assets={assets}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            walletBalance={walletBalance}
            onExecuteTrade={handleExecuteTrade}
          />
        )}
      </main>

      {/* Meteora Launch Modal */}
      <MeteoraLaunchModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        params={pendingLaunchParams}
        onSuccess={handleLaunchSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-[#1B2632] py-8 mt-12 bg-[#070A0F] text-xs text-[#7F8A99] font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F5F7FA]">CurveOS</span>
            <span>—</span>
            <span>Programmable Launch Infrastructure on Meteora DBC</span>
          </div>
          <div className="flex items-center gap-4 text-[#7F8A99]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18D5E8]" />
              Meteora DBC Program
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35E6A2]" />
              DAMM v2 Liquidity Layer
            </span>
            <span className="text-[#F5F7FA]">Superteam Earn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
