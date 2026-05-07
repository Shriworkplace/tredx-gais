import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { Asset, useTradeStore } from '../store/useTradeStore';
import { Card } from './UI';
import { formatCurrency, cn } from '../utils/utils';

interface TradeModalProps {
  asset: Asset;
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'buy' | 'sell';
}

export const TradeModal = ({ asset, isOpen, onClose, initialType = 'buy' }: TradeModalProps) => {
  const { balance, executeOrder, portfolio } = useTradeStore();
  const [type, setType] = React.useState<'buy' | 'sell'>(initialType);
  const [amount, setAmount] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setIsCompleted(false);
    }
  }, [isOpen, initialType]);
  
  const ownedAsset = portfolio.find(p => p.assetId === asset.id);
  const totalValue = Number(amount) * asset.price;
  const canAfford = type === 'buy' ? balance >= totalValue : (ownedAsset?.amount || 0) >= Number(amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    
    executeOrder({
      assetId: asset.id,
      symbol: asset.symbol,
      type,
      amount: Number(amount),
      price: asset.price
    });
    
    setIsCompleted(true);
    setTimeout(() => {
      onClose();
      setAmount('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] p-4"
          >
            <Card variant="solid" className="shadow-2xl border-black/10 dark:border-white/10 p-0">
              <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary-mint border border-black/5 dark:border-white/5">
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{asset.name}</h3>
                    <span className="text-xs text-slate-500">{asset.symbol} • {formatCurrency(asset.price)}</span>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 relative">
                <AnimatePresence>
                  {isCompleted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                    >
                      <div className="w-16 h-16 bg-primary-mint/20 rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="text-primary-mint" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Transaction Completed!</h3>
                      <p className="text-sm text-slate-500">
                        Successfully {type === 'buy' ? 'purchased' : 'sold'} {amount} {asset.symbol}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-xl mb-6 border border-black/5 dark:border-white/5">
                  <button
                    onClick={() => setType('buy')}
                    className={cn(
                      "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all",
                      type === 'buy' ? "bg-primary-mint text-black shadow-lg shadow-primary-mint/20" : "text-slate-500 hover:text-white"
                    )}
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => setType('sell')}
                    className={cn(
                      "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all",
                      type === 'sell' ? "bg-accent-pink text-white shadow-lg shadow-accent-pink/20" : "text-slate-500 hover:text-white"
                    )}
                  >
                    SELL
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">AMOUNT ({asset.symbol})</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-100 dark:bg-slate-950 border border-black/10 dark:border-white/10 rounded-xl py-4 px-4 text-xl font-display font-bold text-slate-900 dark:text-white focus:outline-none focus:border-primary-mint/50 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                      />
                      <button 
                        type="button"
                        onClick={() => setAmount(type === 'buy' ? (balance / asset.price).toString() : (ownedAsset?.amount || 0).toString())}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-primary-mint hover:underline"
                      >
                        MAX
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 space-y-2 border border-black/5 dark:border-white/5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Order Value</span>
                      <span className="text-slate-900 dark:text-white font-bold">{formatCurrency(totalValue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Available {type === 'buy' ? 'Cash' : asset.symbol}</span>
                      <span className="text-slate-900 dark:text-white font-bold">{type === 'buy' ? formatCurrency(balance) : `${ownedAsset?.amount || 0} ${asset.symbol}`}</span>
                    </div>
                  </div>

                  <button
                    disabled={!canAfford || !amount}
                    className={cn(
                      "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                      type === 'buy' 
                        ? "bg-primary-mint text-black disabled:bg-slate-800 disabled:text-slate-500" 
                        : "bg-accent-pink text-white disabled:bg-slate-800 disabled:text-slate-500"
                    )}
                  >
                    {!canAfford ? 'INSUFFICIENT FUNDS' : `${type.toUpperCase()} ${asset.symbol}`}
                  </button>
                </form>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/20 text-center border-t border-black/5 dark:border-white/5">
                <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <Info size={12} /> Execution is simulated. Prices are real-time data feeds.
                </p>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

