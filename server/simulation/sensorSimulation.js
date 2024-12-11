"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const Asset_js_1 = require("../models/Asset.js");
const config_js_1 = require("../db/config.js");
const wss = new ws_1.default.Server({ port: 8080 });
const generateSensorData = (baseValue, variance) => {
    return baseValue + (Math.random() - 0.5) * variance;
};
const updateAssetSensors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = yield Asset_js_1.Asset.findAll();
        for (const asset of assets) {
            const sensorData = {
                assetId: asset.id,
                temperature: generateSensorData(85, 10),
                vibration: generateSensorData(0.5, 0.2),
                noise: generateSensorData(75, 15),
                timestamp: new Date().toISOString(),
            };
            // Update asset in database
            yield asset.update({
                temperature: sensorData.temperature,
                vibration: sensorData.vibration,
                noise: sensorData.noise,
            });
            // Broadcast to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws_1.default.OPEN) {
                    client.send(JSON.stringify(sensorData));
                }
            });
        }
    }
    catch (error) {
        console.error('Error updating sensor data:', error);
    }
});
// Initialize database connection
config_js_1.sequelize.authenticate().then(() => {
    console.log('Sensor simulation started');
    // Update sensor data every 5 seconds
    setInterval(updateAssetSensors, 5000);
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
