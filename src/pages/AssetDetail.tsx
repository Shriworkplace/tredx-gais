import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLivePrices } from '../hooks/useLivePrices';
import { Card, Button } from '../components/UI';
import { MarketChart } from '../components/Charts';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Info } from 'lucide-react';
import { formatCurrency, cn } from '../utils/utils';
import { useState } from 'react';
import { TradeModal } from '../components/TradeModal';

export const AssetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const assets = useLivePrices();
    const asset = assets.find(a => a.id === id);
    const [isTradeOpen, setIsTradeOpen] = useState(false);

    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

    if (!asset) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 gap-4">
                <p>Asset synchronization lost.</p>
                <Button onClick={() => navigate('/')}>RETURN TO DASHBOARD</Button>
            </div>
        );
    }

    const handleTradeInit = (type: 'buy' | 'sell') => {
        setTradeType(type);
        setIsTradeOpen(true);
    };

    const data = asset.sparkline.map((p, i) => ({
        time: `${i}:00`,
        price: p
    }));

    return (
        <div className="space-y-8 pb-20">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Markets</span>
            </button>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 flex items-center justify-center text-3xl font-bold text-primary-mint shadow-2xl">
                        {asset.symbol[0]}
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-widest uppercase">{asset.name}</h1>
                            <span className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-[10px] font-bold text-slate-500 uppercase">{asset.type}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(asset.price)}</span>
                            <span className={cn(
                                "flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded",
                                asset.change24h >= 0 ? "text-primary-mint bg-primary-mint/10" : "text-accent-pink bg-accent-pink/10"
                            )}>
                                {asset.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {Math.abs(asset.change24h)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" className="px-6 border-slate-200 dark:border-white/10">
                        WATCHLIST
                    </Button>
                    <Button 
                        onClick={() => handleTradeInit('buy')}
                        className="px-10 bg-primary-mint text-black border-none shadow-lg shadow-primary-mint/20 font-bold flex gap-2"
                    >
                        <ArrowUpRight size={18} /> BUY {asset.symbol}
                    </Button>
                    <Button 
                        onClick={() => handleTradeInit('sell')}
                        className="px-10 bg-accent-pink text-white border-none shadow-lg shadow-accent-pink/20 font-bold flex gap-2"
                    >
                        <ArrowDownRight size={18} /> SELL {asset.symbol}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card variant="glass" className="p-0 h-[500px] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary-mint/10 rounded-lg">
                                    <Activity size={18} className="text-primary-mint" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-sm">Market Liquidity Index</h3>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-black/5 dark:border-white/5">
                                {['1H', '1D', '1W', '1M', '1Y'].map(t => (
                                    <button key={t} className={cn(
                                        "px-4 py-1 text-[10px] font-bold rounded",
                                        t === '1D' ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                    )}>{t}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            <MarketChart symbol={asset.symbol} data={data} color={asset.change24h >= 0 ? 'mint' : 'pink'} />
                        </div>
                    </Card>

                    <Card variant="solid">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                            <Info size={16} className="text-primary-purple" /> Asset Intelligence
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                            {asset.name} ({asset.symbol}) is currently exhibiting a <span className="text-slate-900 dark:text-white font-bold">{asset.change24h >= 0 ? 'bullish' : 'bearish'}</span> trend in the global markets. 
                            Our neural networks indicate a high probability of consolidation within the current range. Liquidity depth remains optimal 
                            for high-frequency execution.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-black/5 dark:border-white/5">
                            <Button 
                                onClick={() => handleTradeInit('buy')}
                                className="flex-1 bg-primary-mint text-black border-none shadow-lg shadow-primary-mint/20 font-bold py-4 rounded-xl"
                            >
                                <ArrowUpRight size={18} className="mr-2" /> EXECUTE BUY ORDER
                            </Button>
                            <Button 
                                onClick={() => handleTradeInit('sell')}
                                className="flex-1 bg-accent-pink text-white border-none shadow-lg shadow-accent-pink/20 font-bold py-4 rounded-xl"
                            >
                                <ArrowDownRight size={18} className="mr-2" /> EXECUTE SELL ORDER
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card variant="glass">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Market Statistics</h4>
                        <div className="space-y-4">
                             {[
                                { label: 'Market Cap', val: `₹${(asset.price * 1234567).toLocaleString()}` },
                                { label: 'Circulating Supply', val: '19.6M BTC' },
                                { label: '24h High', val: formatCurrency(asset.price * 1.02) },
                                { label: '24h Low', val: formatCurrency(asset.price * 0.98) },
                                { label: 'Volume (24h)', val: '₹124.5B' }
                             ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5 last:border-0">
                                    <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                                    <span className="text-xs text-slate-900 dark:text-white font-bold font-mono">{s.val}</span>
                                </div>
                             ))}
                        </div>
                    </Card>

                    <Card className="bg-primary-purple/10 border-primary-purple/20">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp size={20} className="text-primary-purple" />
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">AI Prediction</h4>
                        </div>
                        <div className="p-3 bg-white/50 dark:bg-slate-950/50 rounded-xl border border-black/5 dark:border-white/5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-primary-mint uppercase">Neural Target</span>
                                <span className="text-[10px] text-slate-500">82% confidence</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(asset.price * 1.05)}</p>
                            <p className="text-[10px] text-slate-500 mt-1">+5.2% project growth expected in 48h</p>
                        </div>
                    </Card>
                </div>
            </div>

            <TradeModal 
                isOpen={isTradeOpen}
                asset={asset}
                onClose={() => setIsTradeOpen(false)}
                initialType={tradeType}
            />
        </div>
    );
};

