import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  type: 'crypto' | 'stock';
  sparkline: number[];
}

export interface Order {
  id: string;
  assetId: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
}

export interface PortfolioAsset {
  assetId: string;
  symbol: string;
  amount: number;
  avgPrice: number;
}

interface TradeState {
  balance: number;
  portfolio: PortfolioAsset[];
  orders: Order[];
  watchlist: string[];
  theme: 'dark' | 'light';
  isAuthenticated: boolean;
  messages: { role: 'user' | 'assistant'; content: string }[];
  
  // Actions
  toggleTheme: () => void;
  setAuthenticated: (val: boolean) => void;
  logout: () => void;
  addMessage: (msg: { role: 'user' | 'assistant'; content: string }) => void;
  clearMessages: () => void;
  addToWatchlist: (id: string) => void;
  removeFromWatchlist: (id: string) => void;
  executeOrder: (order: Omit<Order, 'id' | 'timestamp'>) => void;
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      balance: 10000000,
      portfolio: [
        { assetId: 'bitcoin', symbol: 'BTC', amount: 0.15, avgPrice: 5270000 },
        { assetId: 'ethereum', symbol: 'ETH', amount: 2.5, avgPrice: 280000 },
        { assetId: 'nvidia', symbol: 'NVDA', amount: 10, avgPrice: 74000 },
      ],
      orders: [],
      watchlist: ['bitcoin', 'ethereum', 'solana', 'nvidia', 'apple'],
      theme: 'dark',
      isAuthenticated: false,
      messages: [
        { role: 'assistant', content: 'Hello! I am your TradeX AI assistant. I am now powered by DeepSeek for even more precise market insights. How can I help you today?' }
      ],

      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setAuthenticated: (val) => set({ isAuthenticated: val }),
      logout: () => set({ isAuthenticated: false }),
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      clearMessages: () => set({ messages: [{ role: 'assistant', content: 'Neural pathways reset. How can I assist you now?' }] }),
      
      addToWatchlist: (id) => set((state) => ({
        watchlist: state.watchlist.includes(id) ? state.watchlist : [...state.watchlist, id]
      })),
      
      removeFromWatchlist: (id) => set((state) => ({
        watchlist: state.watchlist.filter(item => item !== id)
      })),

      executeOrder: (orderData) => set((state) => {
        const totalCost = orderData.amount * orderData.price;
        if (orderData.type === 'buy' && state.balance < totalCost) return state;

        const newOrder: Order = {
          ...orderData,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        };

        const newPortfolio = [...state.portfolio];
        const existingAssetIndex = newPortfolio.findIndex(p => p.assetId === orderData.assetId);

        if (orderData.type === 'buy') {
          if (existingAssetIndex >= 0) {
            const asset = newPortfolio[existingAssetIndex];
            const newAmount = asset.amount + orderData.amount;
            const newAvgPrice = (asset.amount * asset.avgPrice + totalCost) / newAmount;
            newPortfolio[existingAssetIndex] = { ...asset, amount: newAmount, avgPrice: newAvgPrice };
          } else {
            newPortfolio.push({
              assetId: orderData.assetId,
              symbol: orderData.symbol,
              amount: orderData.amount,
              avgPrice: orderData.price
            });
          }
        } else {
          if (existingAssetIndex >= 0) {
            const asset = newPortfolio[existingAssetIndex];
            if (asset.amount < orderData.amount) return state;
            asset.amount -= orderData.amount;
            if (asset.amount <= 0) newPortfolio.splice(existingAssetIndex, 1);
          } else {
            return state;
          }
        }

        return {
          balance: state.balance + (orderData.type === 'buy' ? -totalCost : totalCost),
          orders: [newOrder, ...state.orders],
          portfolio: newPortfolio
        };
      }),
    }),
    {
      name: 'tradex-storage',
    }
  )
);
