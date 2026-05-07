import { motion } from 'motion/react';
import { useTradeStore } from '../store/useTradeStore';
import { Card } from '../components/UI';
import { formatCurrency } from '../utils/utils';
import { CheckCircle, Clock } from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export const Orders = () => {
  const { orders } = useTradeStore();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">History</h1>
          <p className="text-sm text-slate-500">Track all your buy and sell simulations.</p>
        </div>
      </div>

      <Card variant="glass" className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asset</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Clock size={40} className="text-slate-800" />
                      <p className="text-slate-500 font-medium font-display">No recent orders found</p>
                      <button className="text-xs font-bold text-primary-mint underline">Start trading</button>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/2 transition-colors border-b border-white/5 last:border-0 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-primary-mint border border-white/5">
                          {order.symbol[0]}
                        </div>
                        <span className="text-sm font-bold text-white">{order.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        order.type === 'buy' ? "bg-primary-mint/10 text-primary-mint" : "bg-accent-pink/10 text-accent-pink"
                      )}>
                        {order.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">{order.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{formatCurrency(order.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">{formatCurrency(order.amount * order.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-primary-mint">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-bold">FILLED</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] text-slate-500">{new Date(order.timestamp).toLocaleString()}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
