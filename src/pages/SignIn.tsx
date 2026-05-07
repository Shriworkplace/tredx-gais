import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTradeStore } from '../store/useTradeStore';
import { Card, Button } from '../components/UI';

export const SignIn = () => {
  const { setAuthenticated } = useTradeStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay for dramatic effect
    setTimeout(() => {
      setAuthenticated(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-bg-deep flex items-center justify-center p-4 z-[200]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-mint/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-purple/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-mint to-primary-cyan flex items-center justify-center shadow-xl shadow-primary-mint/20 mb-4"
          >
            <TrendingUp size={32} className="text-black" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">TradeX <span className="text-primary-mint">Global</span></h1>
          <p className="text-slate-500 text-sm mt-2">The next generation of cinematic trading.</p>
        </div>

        <Card variant="glass" className="border-white/10 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Identity Identifier</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="shrived.work@tradex.ai"
                    defaultValue="shrived.work@tradex.ai"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-primary-mint/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Access Token</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    defaultValue="password123"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-primary-mint/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                type="submit" 
                className="w-full py-4 group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    LINKING NEURAL PATHWAYS...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    SECURE ACCESS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
              
              <button 
                type="button"
                onClick={handleLogin}
                className="w-full py-2.5 text-xs font-bold text-primary-mint border border-primary-mint/20 rounded-xl hover:bg-primary-mint/5 transition-all uppercase tracking-widest"
              >
                Try Platform Demo
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-primary-mint" />
              End-to-End Encryption Active
            </div>
          </div>
        </Card>

        <p className="text-center mt-8 text-xs text-slate-600">
          By accessing TradeX, you agree to our <span className="text-slate-400 hover:underline cursor-pointer">Protocol Terms</span>
        </p>
      </motion.div>
    </div>
  );
};
