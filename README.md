# TradeX - Premium Trading Dashboard

TradeX is a futuristic, cinematic trading platform built with React, Vite, and Tailwind CSS. It features a complete simulated trading environment with real-time price updates and persistent portfolio state.

## 🚀 Features

- **Futuristic UI**: Premium glassmorphism design with neon glow effects.
- **Real-time Simulation**: Assets prices update dynamically to simulate a live market.
- **Portfolio Management**: Buy and sell assets with a persistent balance and transaction history.
- **Interactive Charts**: Responsive market analysis using Recharts.
- **Glassmorphism Components**: Custom reusable UI library designed for readability and elegance.
- **Responsive Layout**: Seamless experience across mobile, tablet, and ultra-wide screens.

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS 4.0
- **Animation**: Framer Motion
- **State Management**: Zustand (with Persist middleware)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download this project.
2. Open your terminal in the project root.
3. Install dependencies:
   ```bash
   npm install
   ```

### Run Locally

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```
The production-ready files will be in the `dist/` directory.

## 📁 Project Structure

```text
src/
  ├── components/    # Reusable glassmorphism UI & Navigation
  ├── data/          # Initial asset seeds and news
  ├── hooks/         # Custom price simulation hooks
  ├── pages/         # High-level route views
  ├── store/         # Zustand global state (TradeStore)
  ├── utils/         # Formatting and styling helpers
  └── App.tsx        # Routing and layout setup
```

## 🚢 Deployment

### Vercel / Netlify
1. Connect your GitHub repository.
2. Set Build Command to `npm run build`.
3. Set Output Directory to `dist`.
4. Deploy!

---
*Built with ❤️ for the Hackathon.*
