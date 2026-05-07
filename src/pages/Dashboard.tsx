import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Zap, Target } from 'lucide-react';
import { useLivePrices } from '../hooks/useLivePrices';
import { Card } from '../components/UI';
import { Sparkline, MarketChart } from '../components/Charts';
import { TradeModal } from '../components/TradeModal';
import { AssetTable } from '../components/AssetTable';
import { useState } from 'react';
import { formatCurrency, cn } from '../utils/utils';
import { Asset } from '../store/useTradeStore';
import { MARKET_NEWS } from '../data/mockData';

export const Dashboard = () => {
  const assets = useLivePrices();
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assets.slice(0, 3).map((asset, i) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/asset/${asset.id}`)}
                className="cursor-pointer group"
              >
                <Card variant="glass" className="hover:border-primary-mint/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{asset.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-display font-bold text-slate-900 dark:text-white transition-colors">{formatCurrency(asset.price)}</span>
                        <span className={cn(
                          "text-xs font-bold flex items-center",
                          asset.change24h >= 0 ? "text-primary-mint" : "text-accent-pink"
                        )}>
                          {asset.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {Math.abs(asset.change24h)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Sparkline data={asset.sparkline} color={asset.change24h >= 0 ? '#00F5A0' : '#FF4D6D'} />
                </Card>
              </motion.div>
            ))}
          </div>

          <MarketChart 
            symbol={assets[0].symbol} 
            data={assets[0].sparkline.map((p, i) => ({ time: `${i}:00`, price: p }))} 
          />
        </div>

        {/* Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6">
          <Card variant="solid" className="p-5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={16} className="text-primary-mint" /> Active Signals
            </h3>
            <div className="space-y-4">
                {MARKET_NEWS.slice(0, 3).map((news, i) => (
                    <div key={i} className="group cursor-pointer">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{news.category}</p>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-mint transition-colors line-clamp-2">{news.title}</h4>
                    </div>
                ))}
            </div>
          </Card>

          <Card variant="glass" className="bg-primary-purple/5 border-primary-purple/20">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={16} className="text-primary-purple" /> Neural Target
            </h3>
            <div className="p-4 bg-slate-900/50 dark:bg-slate-900/50 rounded-xl border border-black/5 dark:border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-primary-purple uppercase">ETH/INR</span>
                    <span className="text-[10px] text-primary-mint font-bold">+12.4%</span>
                </div>
                <div className="h-1.5 w-full bg-black/20 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        className="h-full bg-primary-purple" 
                    />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 italic">Neural processing suggests profit-taking at ₹3.2L</p>
            </div>
          </Card>
        </div>
      </div>

      <AssetTable 
        assets={assets} 
        onTrade={setSelectedAsset} 
        title="Market Performance" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="glass" className="p-0 overflow-hidden">
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-widest">NIFTY 50 Index</h3>
              <p className="text-[10px] text-slate-500 font-medium">BSE/NSE Aggregated Feed</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">22,450.25</span>
              <div className="text-xs text-primary-mint font-bold flex items-center justify-end">
                <ArrowUpRight size={14} /> +0.85%
              </div>
            </div>
          </div>
          <div className="p-4 h-[250px]">
            <MarketChart 
              data={[22100, 22250, 22180, 22350, 22450, 22400, 22450].map((p, i) => ({ time: `${i}d`, price: p }))} 
              color="mint"
            />
          </div>
        </Card>

        <Card variant="glass" className="p-0 overflow-hidden">
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-widest">SENSEX</h3>
              <p className="text-[10px] text-slate-500 font-medium">BSE Primary Feed</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">73,812.10</span>
              <div className="text-xs text-accent-pink font-bold flex items-center justify-end">
                <ArrowDownRight size={14} /> -0.22%
              </div>
            </div>
          </div>
          <div className="p-4 h-[250px]">
            <MarketChart 
              data={[74100, 74000, 73800, 73900, 73750, 73902, 73812].map((p, i) => ({ time: `${i}d`, price: p }))} 
              color="pink"
            />
          </div>
        </Card>
      </div>

      {selectedAsset && (
        <TradeModal 
          isOpen={!!selectedAsset} 
          asset={selectedAsset} 
          onClose={() => setSelectedAsset(null)} 
        />
      )}
    </div>
  );
};
