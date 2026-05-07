import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Sidebar, MobileNav } from './components/Navigation';
import { Topbar } from './components/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Portfolio } from './pages/Portfolio';
import { Orders } from './pages/Orders';
import { Crypto } from './pages/Crypto';
import { Stocks } from './pages/Stocks';
import { Settings } from './pages/Settings';
import { AISpace } from './pages/AISpace';
import { AssetDetail } from './pages/AssetDetail';
import { SignIn } from './pages/SignIn';
import { useTradeStore } from './store/useTradeStore';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const { isAuthenticated, theme } = useTradeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      {!isAuthenticated ? (
        <SignIn />
      ) : (
        <div className="flex min-h-screen bg-white dark:bg-bg-deep text-slate-900 dark:text-slate-200 transition-colors duration-300">
          <Sidebar />
          
          <main className="flex-1 flex flex-col min-w-0 relative">
            <Topbar />
            
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
                  <Route path="/crypto" element={<PageWrapper><Crypto /></PageWrapper>} />
                  <Route path="/stocks" element={<PageWrapper><Stocks /></PageWrapper>} />
                  <Route path="/asset/:id" element={<PageWrapper><AssetDetail /></PageWrapper>} />
                  <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
                  <Route path="/orders" element={<PageWrapper><Orders /></PageWrapper>} />
                  <Route path="/ai-strategy" element={<PageWrapper><AISpace /></PageWrapper>} />
                  <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </div>
          </main>

          <MobileNav />

          <Link 
            to="/ai-strategy"
            className="fixed bottom-20 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-primary-purple text-white rounded-2xl shadow-2xl shadow-primary-purple/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group border border-white/20"
            title="Ask Neural AI"
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-mint rounded-full border-2 border-bg-deep animate-pulse" />
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      )}
    </Router>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

