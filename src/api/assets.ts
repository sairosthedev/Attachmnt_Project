import { api } from './client';
import { Asset } from '../types/asset';

export const getAssets = async (): Promise<Asset[]> => {
  const response = await api.get('/assets');
  return response.data;
};

export const getAssetById = async (id: string): Promise<Asset> => {
  const response = await api.get(`/assets/${id}`);
  return response.data;
};

export const createAsset = async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
  const response = await api.post('/assets', asset);
  return response.data;
};

export const updateAsset = async (id: string, asset: Partial<Asset>): Promise<Asset> => {
  const response = await api.put(`/assets/${id}`, asset);
  return response.data;
};