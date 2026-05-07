import { motion } from 'motion/react';
import { LayoutDashboard, Wallet, Repeat, Settings, Star, TrendingUp, Cpu, Menu, X, Coins } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/utils';
import { useState } from 'react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Coins, label: 'Crypto', path: '/crypto' },
  { icon: TrendingUp, label: 'Stocks', path: '/stocks' },
  { icon: Wallet, label: 'Portfolio', path: '/portfolio' },
  { icon: Repeat, label: 'Orders', path: '/orders' },
  { icon: Cpu, label: 'Ask AI', path: '/ai-strategy' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 260 }}
      className="hidden md:flex flex-col h-screen border-r border-black/5 dark:border-white/5 bg-white/50 dark:bg-bg-deep/50 backdrop-blur-xl sticky top-0 transition-all duration-300 z-50"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-mint to-primary-cyan flex items-center justify-center">
              <TrendingUp size={20} className="text-black" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white">TradeX</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-400"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-6">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-primary-mint/10 text-primary-mint" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <item.icon size={22} className={cn("transition-colors", isActive ? "text-primary-mint" : "group-hover:text-slate-900 dark:group-hover:text-white")} />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        {!isCollapsed && (
          <div className="bg-gradient-to-br from-primary-purple/20 to-primary-cyan/10 p-4 rounded-2xl border border-black/5 dark:border-white/5">
            <h4 className="text-xs font-bold text-primary-purple uppercase tracking-wider mb-1">PRO PLAN</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-3">Copy-trading is active for 4 strategies.</p>
            <button className="w-full py-2 bg-primary-purple text-white text-[11px] font-bold rounded-lg hover:bg-opacity-90">VIEW ANALYTICS</button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export const MobileNav = () => {
  const location = useLocation();
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-bg-deep/80 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 z-50 flex items-center justify-around px-4">
      {MENU_ITEMS.slice(0, 4).map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path} className={cn(
            "flex flex-col items-center gap-1",
            isActive ? "text-primary-mint" : "text-slate-500"
          )}>
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
