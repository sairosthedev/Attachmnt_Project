import { create } from 'zustand';
import { Asset, MaintenanceLog } from '../types/asset';

interface AssetStore {
  assets: Asset[];
  maintenanceLogs: MaintenanceLog[];
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  addMaintenanceLog: (log: MaintenanceLog) => void;
}

export const useAssetStore = create<AssetStore>((set) => ({
  assets: [],
  maintenanceLogs: [],
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
  updateAsset: (id, updatedAsset) =>
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, ...updatedAsset } : asset
      ),
    })),
  addMaintenanceLog: (log) =>
    set((state) => ({
      maintenanceLogs: [...state.maintenanceLogs, log],
    })),
}));