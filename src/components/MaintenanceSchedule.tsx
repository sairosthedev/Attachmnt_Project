import React from 'react';
import { useAssetStore } from '../store/assetStore';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

export const MaintenanceSchedule: React.FC = () => {
  const assets = useAssetStore((state) => state.assets);
  const upcomingMaintenance = assets
    .filter((asset) => new Date(asset.nextMaintenance) > new Date())
    .sort((a, b) => new Date(a.nextMaintenance).getTime() - new Date(b.nextMaintenance).getTime());

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Maintenance</h2>
        <div className="space-y-4">
          {upcomingMaintenance.map((asset) => (
            <div key={asset.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <Calendar className="text-blue-500" />
              <div>
                <h3 className="font-medium">{asset.name}</h3>
                <p className="text-sm text-gray-500">
                  Scheduled: {format(new Date(asset.nextMaintenance), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};