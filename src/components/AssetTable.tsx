import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Sparkline } from './Charts';
import { Asset } from '../store/useTradeStore';
import { formatCurrency, formatCompactNumber, cn } from '../utils/utils';
import { Card } from './UI';
import { useNavigate } from 'react-router-dom';

interface AssetTableProps {
  assets: Asset[];
  onTrade: (asset: Asset) => void;
  title: string;
}

export const AssetTable = ({ assets, onTrade, title }: AssetTableProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<'all' | 'crypto' | 'stock'>('all');

  const filteredAssets = assets.filter(asset => filter === 'all' || asset.type === filter);

  return (
    <Card variant="glass" className="p-0 overflow-hidden">
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between bg-black/[0.01] dark:bg-white/[0.02] gap-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{title}</h3>
        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5">
          {(['all', 'crypto', 'stock'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-4 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all",
                filter === t 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 dark:border-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asset</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">24h Change</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Chart</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Cap</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr 
                key={asset.id} 
                className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer border-b border-black/5 dark:border-white/5 last:border-0" 
                onClick={() => navigate(`/asset/${asset.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary-mint border border-black/5 dark:border-white/5">
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{asset.name}</div>
                      <div className="text-xs text-slate-500">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(asset.price)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs font-bold flex items-center gap-1",
                    asset.change24h >= 0 ? "text-primary-mint" : "text-accent-pink"
                  )}>
                    {asset.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(asset.change24h)}%
                  </span>
                </td>
                <td className="px-6 py-4 w-32">
                  <Sparkline data={asset.sparkline} color={asset.change24h >= 0 ? '#00F5A0' : '#FF4D6D'} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium font-mono">
                    ₹{formatCompactNumber(asset.price * 1000000)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onTrade(asset)}
                    className="px-4 py-1.5 rounded-lg bg-primary-mint/10 text-primary-mint text-xs font-bold hover:bg-primary-mint hover:text-black transition-all"
                  >
                    TRADE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
