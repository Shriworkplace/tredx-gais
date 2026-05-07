import { motion } from 'motion/react';
import { useTradeStore } from '../store/useTradeStore';
import { Card } from '../components/UI';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency, formatCompactNumber } from '../utils/utils';
import { INITIAL_ASSETS } from '../data/mockData';
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Portfolio = () => {
  const { portfolio, balance } = useTradeStore();

  const portfolioValue = portfolio.reduce((sum, item) => {
    const asset = INITIAL_ASSETS.find(a => a.id === item.assetId);
    return sum + (asset?.price || 0) * item.amount;
  }, 0);

  const totalWealth = portfolioValue + balance;

  const chartData = portfolio.map(item => {
    const asset = INITIAL_ASSETS.find(a => a.id === item.assetId);
    return {
      name: asset?.name,
      value: (asset?.price || 0) * item.amount,
      color: asset?.type === 'crypto' ? '#00F5A0' : '#7B61FF'
    };
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">ESTIMATED BALANCE</p>
              <h1 className="text-4xl font-display font-bold text-white">{formatCurrency(totalWealth)}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-primary-mint text-sm font-bold bg-primary-mint/10 px-2 py-0.5 rounded-lg">
                  <ArrowUpRight size={14} /> +12.4%
                </span>
                <span className="text-xs text-slate-500">+₹3,50,000 today</span>
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-white/5">
              <Wallet className="text-primary-mint" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Available Cash</p>
                <p className="text-lg font-bold text-white">{formatCurrency(balance)}</p>
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Assets Value</p>
                <p className="text-lg font-bold text-white">{formatCurrency(portfolioValue)}</p>
             </div>
          </div>
        </Card>

        <Card variant="solid" className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-white text-sm mb-4">Allocation</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#0B1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-mint" />
                <span className="text-[10px] font-bold text-slate-400">CRYPTO</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-purple" />
                <span className="text-[10px] font-bold text-slate-400">STOCKS</span>
             </div>
          </div>
        </Card>
      </div>

      <Card variant="glass" className="p-0">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-bold text-white text-lg">Your Assets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asset</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Balance</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Equity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">PL (%)</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => {
                const asset = INITIAL_ASSETS.find(a => a.id === item.assetId);
                const currentVal = (asset?.price || 0) * item.amount;
                const pl = ((asset?.price || 0) - item.avgPrice) / item.avgPrice * 100;
                
                return (
                  <tr key={item.assetId} className="hover:bg-white/2 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-primary-mint border border-white/5">
                          {item.symbol[0]}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{item.symbol}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{asset?.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">{item.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-400">{formatCurrency(asset?.price || 0)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">{formatCurrency(currentVal)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-xs font-bold",
                        pl >= 0 ? "text-primary-mint" : "text-accent-pink"
                      )}>
                        {pl >= 0 ? '+' : ''}{pl.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
