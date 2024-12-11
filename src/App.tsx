import React from 'react';
import { AssetList } from './components/AssetList';
import { MaintenanceSchedule } from './components/MaintenanceSchedule';
import { LayoutDashboard } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Asset Tracking System</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssetList />
          <MaintenanceSchedule />
        </div>
      </main>
    </div>
  );
}

export default App;