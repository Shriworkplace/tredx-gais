import { useState, useEffect } from 'react';
import { Asset } from '../store/useTradeStore';
import { INITIAL_ASSETS } from '../data/mockData';

export function useLivePrices() {
  const [assets] = useState<Asset[]>(INITIAL_ASSETS);

  return assets;
}
