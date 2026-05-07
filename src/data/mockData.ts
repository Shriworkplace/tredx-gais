import { Asset } from '../store/useTradeStore';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 5459592,
    change24h: 2.45,
    type: 'crypto',
    sparkline: [5270000, 5312000, 5253000, 5355000, 5397000, 5459592]
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 293267,
    change24h: -1.2,
    type: 'crypto',
    sparkline: [301750, 297500, 295800, 299200, 290700, 293267]
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 12393,
    change24h: 5.67,
    type: 'crypto',
    sparkline: [11050, 11475, 11220, 11900, 12070, 12393]
  },
  {
    id: 'nvidia',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 75688,
    change24h: 3.12,
    type: 'stock',
    sparkline: [72250, 73100, 72675, 74375, 75225, 75688]
  },
  {
    id: 'apple',
    symbol: 'AAPL',
    name: 'Apple Inc',
    price: 14645,
    change24h: -0.45,
    type: 'stock',
    sparkline: [14875, 14790, 14705, 14747, 14688, 14645]
  },
  {
    id: 'tesla',
    symbol: 'TSLA',
    name: 'Tesla Inc',
    price: 14892,
    change24h: -4.20,
    type: 'stock',
    sparkline: [16150, 15725, 15470, 15300, 15130, 14892]
  }
];

export const MARKET_NEWS = [
  {
    id: 1,
    title: "Fed keeping rates steady signals market stability",
    source: "Financial Times",
    time: "2h ago",
    category: "Macro"
  },
  {
    id: 2,
    title: "NVIDIA unveils next-gen Blackwell architecture",
    source: "TechCrunch",
    time: "4h ago",
    category: "Tech"
  },
  {
    id: 3,
    title: "Bitcoin ETFs see record inflows this week",
    source: "CoinDesk",
    time: "6h ago",
    category: "Crypto"
  }
];
