import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useWebSocket } from '../hooks/useWebSocket';

interface SensorData {
  assetId: string;
  temperature: number;
  vibration: number;
  noise: number;
  timestamp: string;
}

export const AssetMonitoring: React.FC = () => {
  const [sensorHistory, setSensorHistory] = useState<SensorData[]>([]);
  const { lastMessage } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage as string) as SensorData;
      setSensorHistory((prev) => [...prev.slice(-20), data]);
    }
  }, [lastMessage]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Real-time Monitoring</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Temperature</h3>
          <LineChart width={600} height={200} data={sensorHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          </LineChart>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Vibration</h3>
          <LineChart width={600} height={200} data={sensorHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="vibration" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Noise Level</h3>
          <LineChart width={600} height={200} data={sensorHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="noise" stroke="#ffc658" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};