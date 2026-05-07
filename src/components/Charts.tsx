import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, AreaChart, Area } from 'recharts';
import { Card } from './UI';
import { formatCurrency } from '../utils/utils';

export const Sparkline = ({ data, color = '#00F5A0' }: { data: number[], color?: string }) => {
  const chartData = data.map((val, i) => ({ val, i }));
  
  return (
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="val" 
            stroke={color} 
            strokeWidth={2} 
            fill={`url(#gradient-${color})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MarketChart = ({ symbol, data, color = 'mint' }: { symbol?: string, data: any[], color?: 'mint' | 'pink' }) => {
  const hexColor = color === 'mint' ? '#00F5A0' : '#FF4D6D';
  
  return (
    <Card className="h-[400px] flex flex-col p-0">
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">{symbol ? `${symbol} Technical Analysis` : 'Market Trends'}</h3>
          <p className="text-xs text-slate-500">Live market intervals</p>
        </div>
        <div className="flex gap-2">
          {['1H', '4H', '1D', '1W', 'ALL'].map(t => (
            <button key={t} className="px-3 py-1 rounded-lg text-[10px] font-bold border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400">
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`mainChartGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={hexColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={hexColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis 
               domain={['auto', 'auto']} 
               hide 
            />
            <Tooltip 
              contentStyle={{ background: '#0B1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: hexColor, fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#64748b', fontSize: '10px' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={hexColor} 
              strokeWidth={3} 
              fill={`url(#mainChartGradient-${color})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
