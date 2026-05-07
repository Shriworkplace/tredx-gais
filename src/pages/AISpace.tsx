import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Cpu, Sparkles, User, BrainCircuit, LineChart, Trash2, Bot } from 'lucide-react';
import { useTradeStore } from '../store/useTradeStore';
import { Card, Button } from '../components/UI';
import { chatWithDeepSeek } from '../services/aiService';
import { cn } from '../utils/utils';

export const AISpace = () => {
  const { messages, addMessage, clearMessages } = useTradeStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

    const handleSend = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const messageToSend = customInput || input;
    if (!messageToSend.trim() || loading) return;

    const userMsg = messageToSend.trim();
    if (!customInput) setInput('');
    addMessage({ role: 'user', content: userMsg });
    setLoading(true);

    try {
      const response = await chatWithDeepSeek(
        messages.map(m => ({ role: m.role, content: m.content })).concat({ role: 'user', content: userMsg })
      );
      
      addMessage({ role: 'assistant', content: response || "I was unable to process that signal." });
    } catch (error) {
      console.error('DeepSeek Error:', error);
      // Fallback to simulated response for demo purposes
      setTimeout(() => {
        const fallbackResponses = [
          "Market sentiment suggests a bullish divergence in the 4-hour timeframe. DeepSeek suggests monitoring support at the current levels.",
          "Based on neural pattern matching, we're seeing increased liquidity inflows into high-cap assets. Diversification is recommended.",
          "Vector analysis of current volatility indices indicates a period of consolidation before a potential breakout move.",
          "Strategic data streams indicate institutional accumulation in this sector. Recommend holding for mid-term targets."
        ];
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        addMessage({ role: 'assistant', content: `[SIMULATED] ${randomResponse}` });
        setLoading(false);
      }, 1000);
      return; // Return early since we handle loading state in timeout
    } finally {
      if (!loading) setLoading(false); // Only set loading if we haven't returned early
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-purple/10 rounded-2xl border border-primary-purple/20 shadow-lg shadow-primary-purple/10">
            <Cpu className="text-primary-purple" size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">Neural Strategy Hub</h1>
            <p className="text-sm text-slate-500">Powered by DeepSeek-V3 Intelligence</p>
          </div>
        </div>

        <div className="flex gap-2">
           <Button 
            variant="outline" 
            onClick={clearMessages}
            className="border-black/10 dark:border-white/10 text-slate-500 hover:text-accent-pink px-4 whitespace-nowrap flex-shrink-0"
           >
             <Trash2 size={16} className="mr-2" /> Clear Neural Cache
           </Button>
           <div className="hidden md:flex gap-4">
              {[ 
                { icon: BrainCircuit, label: 'DeepSeek-V3' },
                { icon: LineChart, label: 'Analytics' }
              ].map((item, i) => (
                <div key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-xl flex items-center gap-2">
                   <item.icon size={14} className="text-primary-mint" />
                   <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <Card variant="glass" className="flex-1 flex flex-col p-0 overflow-hidden relative border-black/10 dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-purple/5 to-transparent pointer-events-none" />
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex items-start gap-3 md:gap-4 max-w-[90%] md:max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-lg",
                  msg.role === 'user' ? "bg-primary-mint shadow-primary-mint/20" : "bg-primary-purple shadow-primary-purple/20"
                )}>
                  {msg.role === 'user' ? <User size={16} className="text-black" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary-mint/10 text-slate-900 dark:text-white border border-primary-mint/20" 
                    : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/5"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-primary-purple"
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-primary-purple rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-primary-purple rounded-full animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 bg-primary-purple rounded-full animate-bounce delay-150" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest ml-2">Processing market vectors...</span>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-black/5 dark:border-white/5 backdrop-blur-md">
            <form onSubmit={(e) => handleSend(e)} className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crypto trends, NVDA analysis, or strategy tips..."
                className="w-full bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-primary-purple/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white shadow-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-purple text-white rounded-xl shadow-lg shadow-primary-purple/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </Card>

        <div className="w-full lg:w-80 space-y-6 overflow-y-auto lg:overflow-visible pr-2">
           <Card className="bg-gradient-to-br from-primary-purple/10 to-primary-cyan/5 border-primary-purple/10 border-dashed">
              <h4 className="text-xs font-bold text-primary-purple uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sparkles size={14} className="animate-pulse" /> Strategy Seeds
              </h4>
              <div className="space-y-2">
                {[
                  "What is the current BTC RSI level?",
                  "Analyze sentiment for NVDA earnings",
                  "Compare ETH vs SOL market dominance",
                  "Define a scalping strategy for today",
                  "Identify breakout patterns in DeFi"
                ].map((suggestion, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(undefined, suggestion)}
                    disabled={loading}
                    className="w-full text-left p-3 rounded-xl text-[10px] bg-white/40 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10 hover:text-primary-purple transition-all border border-black/5 dark:border-white/5 shadow-sm group disabled:opacity-50 flex gap-2 items-start"
                  >
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">›</span>
                    <span className="flex-1 break-words">{suggestion}</span>
                  </button>
                ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};
