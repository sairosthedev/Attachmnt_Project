import { api } from './client';
import { MaintenanceLog } from '../types/asset';

export const getMaintenanceLogs = async (): Promise<MaintenanceLog[]> => {
  const response = await api.get('/maintenance');
  return response.data;
};

export const getAssetMaintenanceLogs = async (assetId: string): Promise<MaintenanceLog[]> => {
  const response = await api.get(`/maintenance/asset/${assetId}`);
  return response.data;
};

export const createMaintenanceLog = async (log: Omit<MaintenanceLog, 'id' | 'date'>): Promise<MaintenanceLog> => {
  const response = await api.post('/maintenance', log);
  return response.data;
};