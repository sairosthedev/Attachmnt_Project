import { Asset } from '../types/asset';
import { addDays } from 'date-fns';

export const sampleAssets: Asset[] = [
  {
    id: '1',
    name: 'Excavator XC-200',
    type: 'Heavy Equipment',
    status: 'operational',
    lastMaintenance: '2024-03-01',
    nextMaintenance: addDays(new Date(), 5).toISOString(),
    healthScore: 92,
    location: 'Site A',
    purchaseDate: '2023-01-15',
    manufacturer: 'CAT',
  },
  {
    id: '2',
    name: 'Bulldozer BD-100',
    type: 'Heavy Equipment',
    status: 'maintenance',
    lastMaintenance: '2024-02-15',
    nextMaintenance: addDays(new Date(), 2).toISOString(),
    healthScore: 78,
    location: 'Site B',
    purchaseDate: '2022-11-30',
    manufacturer: 'Komatsu',
  },
  {
    id: '3',
    name: 'Crane CR-300',
    type: 'Heavy Equipment',
    status: 'repair',
    lastMaintenance: '2024-02-28',
    nextMaintenance: addDays(new Date(), 7).toISOString(),
    healthScore: 45,
    location: 'Site C',
    purchaseDate: '2023-03-20',
    manufacturer: 'Liebherr',
  },
];