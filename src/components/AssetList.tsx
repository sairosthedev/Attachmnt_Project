import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { useAssets } from '../hooks/useAssets';

const statusIcons = {
  operational: <CheckCircle className="text-green-500" />,
  maintenance: <Wrench className="text-yellow-500" />,
  repair: <AlertTriangle className="text-red-500" />,
  offline: <Activity className="text-gray-500" />,
};

export const AssetList: React.FC = () => {
  const { assets, isLoading, error } = useAssets();

  if (isLoading) {
    return <div>Loading assets...</div>;
  }

  if (error) {
    return <div>Error loading assets</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Assets Overview</h2>
        <div className="grid gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {statusIcons[asset.status]}
                <div>
                  <h3 className="font-medium">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">Health Score</p>
                <p className="font-semibold">{asset.healthScore}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};