import { Card } from '../components/UI';
import { User, Bell, Shield, Smartphone, Globe, Moon } from 'lucide-react';
import { useTradeStore } from '../store/useTradeStore';

export const Settings = () => {
  const { balance } = useTradeStore();

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500">Manage your profile and trading preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-purple to-primary-cyan flex items-center justify-center text-xl font-bold text-white">JD</div>
               <div>
                  <h3 className="text-lg font-bold text-white">John Doe</h3>
                  <p className="text-xs text-slate-500">shrived.work@gmail.com</p>
               </div>
               <button className="ml-auto px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10">Edit Profile</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
               <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Account Level</p>
                  <p className="text-sm font-bold text-primary-mint uppercase tracking-wider">Tier 3 (Verified)</p>
               </div>
               <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Trading Limit</p>
                  <p className="text-sm font-bold text-white">Unlimited</p>
               </div>
            </div>
          </Card>

          <Card variant="glass">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <Bell size={18} className="text-primary-purple" /> Notifications
            </h3>
            <div className="space-y-4">
               {[
                 { label: 'Price Alerts', desc: 'Notify me when assets move more than 5%' },
                 { label: 'Order Execution', desc: 'Get updates on your buy/sell orders' },
                 { label: 'Product Updates', desc: 'Stay updated with new feature releases' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between py-2">
                    <div>
                       <p className="text-sm font-bold text-white">{item.label}</p>
                       <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <div className="w-10 h-5 bg-primary-mint rounded-full relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                    </div>
                 </div>
               ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
           <Card variant="solid">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Links</h4>
              <nav className="space-y-1">
                 {[
                   { icon: Shield, label: 'Security' },
                   { icon: Smartphone, label: 'Linked Devices' },
                   { icon: Globe, label: 'Language & Region' },
                   { icon: Moon, label: 'Appearance' }
                 ].map((item, i) => (
                   <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                   </button>
                 ))}
              </nav>
           </Card>

           <Card className="bg-primary-purple/10 border-primary-purple/20">
              <h4 className="text-xs font-bold text-primary-purple uppercase tracking-widest mb-2">Support</h4>
              <p className="text-xs text-slate-400 mb-4">Our premium support team is available 24/7 for Enterprise members.</p>
              <button className="w-full py-2.5 bg-primary-purple text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-primary-purple/30 transition-all">
                 CONTACT SUPPORT
              </button>
           </Card>
        </div>
      </div>
    </div>
  );
};
