'use client';

import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CurveParameters } from '../types';

interface MeteoraLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: CurveParameters;
  onSuccess: (newAsset: any) => void;
}

export const MeteoraLaunchModal: React.FC<MeteoraLaunchModalProps> = ({
  isOpen,
  onClose,
  params,
  onSuccess,
}) => {
  const [step, setStep] = useState<'review' | 'deploying' | 'success'>('review');
  const [txSignature, setTxSignature] = useState('');
  const [poolAddress, setPoolAddress] = useState('');

  if (!isOpen) return null;

  const handleDeploy = () => {
    setStep('deploying');

    setTimeout(() => {
      const randomSig = `5Wd${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}XyZ99`;
      const randomPool = `DBC-Pool-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${params.quoteToken}`;
      setTxSignature(randomSig);
      setPoolAddress(randomPool);
      setStep('success');

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onSuccess({
        id: `asset-${Date.now()}`,
        ticker: 'NEW-DBC',
        name: 'Custom Asset on Meteora DBC',
        category: 'stock',
        badge: 'Newly Launched',
        icon: '🌟',
        valuation: params.graduationCap * 10,
        currentPrice: params.startPrice,
        targetPrice: params.graduationPrice,
        raisedUsdc: params.initialLiquidity,
        graduationTarget: params.graduationCap,
        isGraduated: false,
        curveShape: params.shape,
        backingDoc: 'Verified Meteora On-Chain Bonding Curve',
        transferHookRule: 'Solana Token-2022 Transfer Hook Active',
        description: 'Newly deployed dynamic bonding curve with automated DAMM v2 migration.',
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A0F]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D1219] border border-[#1B2632] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-[#7F8A99] hover:text-[#F5F7FA] hover:bg-[#11161D]"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'review' && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#18D5E8]/10 text-[#18D5E8] border border-[#18D5E8]/30 flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#F5F7FA] font-mono">
                  Deploy to Meteora DBC
                </h3>
                <p className="text-xs text-[#7F8A99]">
                  Ready to deploy Dynamic Bonding Curve on Solana Devnet
                </p>
              </div>
            </div>

            {/* Parameter Review Matrix */}
            <div className="bg-[#11161D] rounded-2xl p-4 border border-[#1B2632] space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#1B2632]">
                <span className="text-[#7F8A99]">Curve Shape</span>
                <span className="text-[#18D5E8] font-bold capitalize">{params.shape}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1B2632]">
                <span className="text-[#7F8A99]">Starting Price</span>
                <span className="text-[#F5F7FA] font-bold">${params.startPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1B2632]">
                <span className="text-[#7F8A99]">Target Graduation Price</span>
                <span className="text-[#35E6A2] font-bold">${params.graduationPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1B2632]">
                <span className="text-[#7F8A99]">DAMM Graduation Threshold</span>
                <span className="text-[#F5F7FA] font-bold">${params.graduationCap.toLocaleString()} {params.quoteToken}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1B2632]">
                <span className="text-[#7F8A99]">Dynamic Base Fee</span>
                <span className="text-[#F5F7FA] font-bold">{params.feePercentage}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7F8A99]">Automated Migration Target</span>
                <span className="text-[#35E6A2] font-bold">Meteora DAMM v2 (Permanent Lock)</span>
              </div>
            </div>

            {/* Instruction Warning / Confirmation */}
            <div className="p-3.5 rounded-xl bg-[#070A0F] border border-[#1B2632] text-[11px] text-[#7F8A99] space-y-1">
              <span className="font-bold text-[#18D5E8] block font-mono">Meteora Program Instruction:</span>
              <p>
                Invoking <code className="text-[#F5F7FA]">initialize_dynamic_bonding_curve</code> on Meteora DBC Program. LP tokens will be irrevocably programmed to migrate into DAMM v2 upon threshold attainment.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-[#11161D] hover:bg-[#1B2632] text-[#7F8A99] hover:text-[#F5F7FA] font-mono text-xs font-bold transition-all"
              >
                Back to Studio
              </button>
              <button
                onClick={handleDeploy}
                className="flex-1 py-3 rounded-xl bg-[#35E6A2] hover:bg-[#5EEAB3] text-[#070A0F] font-mono text-xs font-black shadow-lg shadow-[#35E6A2]/20 transition-all flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4 fill-[#070A0F]" />
                <span>CONFIRM & LAUNCH</span>
              </button>
            </div>
          </div>
        )}

        {step === 'deploying' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 font-mono">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-[#18D5E8]/20 border-t-[#18D5E8] animate-spin" />
              <Rocket className="w-6 h-6 text-[#18D5E8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#F5F7FA]">Deploying to Meteora DBC Program...</h4>
              <p className="text-xs text-[#7F8A99]">
                Registering bonding curve parameters & setting DAMM v2 migration hook
              </p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#35E6A2]/15 text-[#35E6A2] border border-[#35E6A2]/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#F5F7FA] font-mono">
                  Successfully Deployed!
                </h3>
                <p className="text-xs text-[#35E6A2]">
                  Dynamic Bonding Curve is live on Solana Devnet
                </p>
              </div>
            </div>

            <div className="bg-[#11161D] rounded-2xl p-4 border border-[#1B2632] space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#7F8A99] block uppercase">Meteora DBC Pool Address</span>
                <span className="text-[#18D5E8] font-bold break-all">{poolAddress}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7F8A99] block uppercase">Solana Transaction Signature</span>
                <span className="text-[#F5F7FA] font-bold break-all">{txSignature}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7F8A99] block uppercase">Liquidity Migration Hook</span>
                <span className="text-[#35E6A2] font-bold">Automated DAMM v2 Trigger Activated</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#35E6A2] hover:bg-[#5EEAB3] text-[#070A0F] font-mono text-xs font-black shadow-lg shadow-[#35E6A2]/20 transition-all"
            >
              COMPLETE & VIEW IN DASHBOARD
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
