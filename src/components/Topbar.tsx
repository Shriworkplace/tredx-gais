import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, Wallet, User, ChevronDown, Moon, Sun, LogOut, Sparkles } from 'lucide-react';
import { useTradeStore } from '../store/useTradeStore';
import { formatCurrency } from '../utils/utils';
import { Link } from 'react-router-dom';

export const Topbar = () => {
  const { balance, theme, toggleTheme, logout } = useTradeStore();

  return (
    <header className="h-20 border-b border-black/5 dark:border-white/5 bg-white/30 dark:bg-bg-deep/30 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-mint transition-colors" />
          <input 
            type="text" 
            placeholder="Search assets, markers, news..." 
            className="w-full bg-slate-100 dark:bg-slate-900/50 border border-black/5 dark:border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-mint/30 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">TOTAL BALANCE</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white font-display">{formatCurrency(balance)}</span>
        </div>

        <div className="h-8 w-px bg-black/5 dark:border-white/5 hidden sm:block" />

        <div className="flex items-center gap-4">
          <Link 
            to="/ai-strategy"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-purple/10 text-primary-purple rounded-xl border border-primary-purple/20 hover:bg-primary-purple/20 transition-all text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary-purple/5"
          >
            <Sparkles size={14} /> AI CHAT
          </Link>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 group transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-mint rounded-full border-2 border-white dark:border-bg-deep" />
          </button>

          <div className="relative group/profile">
            <button className="flex items-center gap-2 py-1.5 pl-1.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-black/10 dark:border-white/5 hover:border-primary-mint/20 transition-all text-slate-900 dark:text-white">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-purple to-primary-cyan flex items-center justify-center text-xs font-bold text-white uppercase">
                JD
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all z-50 overflow-hidden">
               <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left">
                  <User size={14} /> ACCOUNT PROFILE
               </button>
               <button 
                onClick={() => logout()}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-accent-pink hover:bg-accent-pink/10 transition-all border-t border-black/5 dark:border-white/5 text-left"
               >
                  <LogOut size={14} /> SIGN OUT
               </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
