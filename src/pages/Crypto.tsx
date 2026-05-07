import { useState } from 'react';
import { useLivePrices } from '../hooks/useLivePrices';
import { AssetTable } from '../components/AssetTable';
import { TradeModal } from '../components/TradeModal';
import { Asset } from '../store/useTradeStore';
import { Coins } from 'lucide-react';

export const Crypto = () => {
  const allAssets = useLivePrices();
  const cryptoAssets = allAssets.filter(asset => asset.type === 'crypto');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-mint/10 rounded-2xl border border-primary-mint/20">
          <Coins className="text-primary-mint" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Cryptocurrencies</h1>
          <p className="text-sm text-slate-500">Real-time digital asset trading simulation</p>
        </div>
      </div>

      <AssetTable 
        assets={cryptoAssets} 
        onTrade={setSelectedAsset} 
        title="Digital Assets" 
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
