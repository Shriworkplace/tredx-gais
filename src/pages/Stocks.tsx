import { useState } from 'react';
import { useLivePrices } from '../hooks/useLivePrices';
import { AssetTable } from '../components/AssetTable';
import { TradeModal } from '../components/TradeModal';
import { Asset } from '../store/useTradeStore';
import { TrendingUp } from 'lucide-react';

export const Stocks = () => {
  const allAssets = useLivePrices();
  const stockAssets = allAssets.filter(asset => asset.type === 'stock');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-purple/10 rounded-2xl border border-primary-purple/20">
          <TrendingUp className="text-primary-purple" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Stock Markets</h1>
          <p className="text-sm text-slate-500">Global equity trading simulation</p>
        </div>
      </div>

      <AssetTable 
        assets={stockAssets} 
        onTrade={setSelectedAsset} 
        title="Equity Markets" 
      />

      {selectedAsset && (
        <TradeModal 
          isOpen={!!selectedAsset} 
          asset={selectedAsset} 
          onClose={() => setSelectedAsset(null)} 
        />
      )}
    </div>
  );
};
