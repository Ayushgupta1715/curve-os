# CurveOS — AI-Native Programmable Launchpad on Meteora DBC

> **The AI-Native Programmable Launch Infrastructure for RWA & Tokenized Assets on Solana**  
> *Built for Superteam Earn Listing: Best use of Meteora's Dynamic Bonding Curve (DBC)*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-curve--os--seven.vercel.app-18D5E8?style=for-the-badge&logo=vercel)](https://curve-os-seven.vercel.app)
[![YouTube Walkthrough](https://img.shields.io/badge/YouTube-Demo%20Walkthrough-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/NMX0ZO1GfYQ)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-white?style=for-the-badge&logo=github)](https://github.com/Ayushgupta1715/curve-os)

- 🌐 **Live Application**: [https://curve-os-seven.vercel.app](https://curve-os-seven.vercel.app)
- 🎥 **Video Walkthrough (YouTube)**: [https://youtu.be/NMX0ZO1GfYQ](https://youtu.be/NMX0ZO1GfYQ)
- 📁 **GitHub Repository**: [https://github.com/Ayushgupta1715/curve-os](https://github.com/Ayushgupta1715/curve-os)

---

## 🏆 The Killer Combination

```
Asset → AI → DBC → Price Discovery → Graduation → Liquidity
```

```
                     CURVEOS
                        │
                ┌───────▼───────┐
                │ Create Asset  │
                └───────┬───────┘
                        ↓
               ┌─────────────────┐
               │ AI Curve Engine │
               └────────┬────────┘
                        ↓
                Meteora DBC Launch
                        ↓
                Price Discovery
                        ↓
               Graduation Trigger
                        ↓
                  DAMM / Liquidity
```

---

## 🏗️ Architecture & Modules

```
CURVEOS
│
├── 🎨 Curve Studio ("Figma for Bonding Curves")
│     └── Visual DBC Designer (Slope, S-Curve, Fee Decay, Cap, Live Simulation)
│
├── 🧠 AI Curve Architect
│     └── Prompt-to-DBC Natural Language Parameter Optimization & Risk Scoring
│
├── 📈 StockFlow (Flagship Module)
│     └── Tokenized Secondary Tech Equities (SpaceX, Stripe, OpenAI, Anthropic)
│     └── Solana Token-2022 Transfer Hook Enforcement & SPV Legal Wrappers
│
├── 🏠 RWA Launches
│     └── Real Estate (Fractional rental yield streaming)
│     └── Gold (Vaulted allocated physical bullion)
│     └── Private Equity & Credit
│
├── 🤖 AI Assets
│     └── GPU Compute Bandwidth & Autonomous Agent Tokens
│
├── 🏪 Curve Marketplace
│     └── Shareable & Verified DBC Presets (Institutional S-Curve, Anti-Snipe, etc.)
│
└── 📊 DBC Trading Terminal & DAMM Migration
      └── Non-custodial price discovery with automated Meteora DAMM v2 migration
```

---

## 🌟 Key Features

### 1. 🎨 Curve Studio — "Figma for Bonding Curves"
- **Interactive Visual Canvas**: Real-time SVG rendering of dynamic bonding curve formulas:
  - *Sigmoid (S-Curve)*: Ideal for tokenized equities & RWAs (low initial slippage, orderly expansion).
  - *Flat-to-Quadratic*: Prevents early sniper bot front-running.
  - *Linear & Exponential*: For commodities and early venture rounds.
- **Dynamic Slippage & Liquidity Simulator (`[ SIMULATE ]`)**:
  - Interactive slider simulating \$1,000 to \$100,000 buy pressure.
  - Computes exact tokens received via numerical integration, effective price, slippage, and distance to graduation.
- **AI Sidecar / Quantitative Critic**:
  - Real-time advisor providing instant feedback:
  - *"⚠️ Your curve is too aggressive for a tokenized equity. Tokenized assets suffer liquidity cliffs if early slope exceeds 15% per $50k volume. Try Conservative RWA preset."*
  - Quick 1-click **Apply AI Fix** button.

### 2. 📈 StockFlow — Flagship Use-Case for Tokenized Equities
- Resolves the 60–90 day illiquidity and high fee problem in private secondary markets.
- Tokenized pre-IPO shares (`sSPACEX`, `sSTRIPE`, `sOPENAI`) trade continuously on Meteora DBCs.
- Enforces SEC Reg D / Rule 144 compliance via Solana Token-2022 transfer hooks.

### 3. 🌊 Automated Meteora DAMM v2 Graduation Protocol
- When the target quote cap is met, 100% of accumulated reserves seamlessly migrate to a permanent **Meteora DAMM v2 pool**.
- Permanent LP lock ensures complete protection against liquidity removal and continuous dynamic fee generation for holders.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on v24)
- npm / pnpm / yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` to interact with **Curve Studio**, **StockFlow**, and **Meteora DBC Launches**.

### Production Build

```bash
npm run build
npm start
```

---

## ⚡ Tech Stack
- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Glassmorphism UI
- **AMM Primitives**: Meteora Dynamic Bonding Curve (DBC) & DAMM v2
- **Solana Ecosystem**: Token-2022 Transfer Hooks, Non-custodial Devnet Program Architecture
- **AI Model**: Google Gemini Quantitative Prompt-to-DBC Analysis Engine
