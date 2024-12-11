import WebSocket from 'ws';
import { Asset } from '../models/Asset.js';
import { sequelize } from '../db/config.js';

const wss = new WebSocket.Server({ port: 8080 });

const generateSensorData = (baseValue: number, variance: number) => {
  return baseValue + (Math.random() - 0.5) * variance;
};

const updateAssetSensors = async () => {
  try {
    const assets = await Asset.findAll();
    
    for (const asset of assets) {
      const sensorData = {
        assetId: asset.id,
        temperature: generateSensorData(85, 10),
        vibration: generateSensorData(0.5, 0.2),
        noise: generateSensorData(75, 15),
        timestamp: new Date().toISOString(),
      };

      // Update asset in database
      await asset.update({
        temperature: sensorData.temperature,
        vibration: sensorData.vibration,
        noise: sensorData.noise,
      });

      // Broadcast to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(sensorData));
        }
      });
    }
  } catch (error) {
    console.error('Error updating sensor data:', error);
  }
};

// Initialize database connection
sequelize.authenticate().then(() => {
  console.log('Sensor simulation started');
  
  // Update sensor data every 5 seconds
  setInterval(updateAssetSensors, 5000);
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});