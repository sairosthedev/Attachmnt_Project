export interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'repair' | 'offline';
  lastMaintenance: string;
  nextMaintenance: string;
  healthScore: number;
  location: string;
  purchaseDate: string;
  manufacturer: string;
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  date: string;
  type: 'routine' | 'repair' | 'emergency';
  description: string;
  cost: number;
  technician: string;
}