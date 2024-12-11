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
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFailureRisk = void 0;
const MaintenanceLog_1 = require("../models/MaintenanceLog");
const COMPONENT_THRESHOLDS = {
    temperature: { warning: 90, critical: 100 },
    vibration: { warning: 0.7, critical: 0.9 },
    noise: { warning: 85, critical: 95 },
};
const analyzeFailureRisk = (asset) => __awaiter(void 0, void 0, void 0, function* () {
    const maintenanceLogs = yield MaintenanceLog_1.MaintenanceLog.findAll({
        where: { assetId: asset.id },
        order: [['date', 'DESC']],
    });
    // Calculate failure probability based on sensor data and thresholds
    const temperatureRisk = asset.temperature / COMPONENT_THRESHOLDS.temperature.critical;
    const vibrationRisk = asset.vibration / COMPONENT_THRESHOLDS.vibration.critical;
    const noiseRisk = asset.noise / COMPONENT_THRESHOLDS.noise.critical;
    const failureProbability = (temperatureRisk + vibrationRisk + noiseRisk) / 3;
    // Estimate time to failure based on operating hours and maintenance history
    const hoursPerDay = 24;
    const estimatedTimeToFailure = Math.max(0, (1000 - asset.operatingHours) / hoursPerDay);
    // Determine critical components and recommended actions
    const criticalComponents = [];
    const recommendedActions = [];
    if (asset.temperature >= COMPONENT_THRESHOLDS.temperature.warning) {
        criticalComponents.push('Cooling system');
        recommendedActions.push('Inspect cooling system');
    }
    if (asset.vibration >= COMPONENT_THRESHOLDS.vibration.warning) {
        criticalComponents.push('Bearings');
        recommendedActions.push('Check bearing alignment');
    }
    if (asset.noise >= COMPONENT_THRESHOLDS.noise.warning) {
        criticalComponents.push('Engine');
        recommendedActions.push('Perform engine diagnostics');
    }
    if (maintenanceLogs.length > 0) {
        const lastMaintenance = maintenanceLogs[0];
        const daysSinceLastMaintenance = Math.floor((Date.now() - new Date(lastMaintenance.date).getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceLastMaintenance > 30) {
            recommendedActions.push('Schedule routine maintenance');
        }
    }
    return {
        failureProbability,
        estimatedTimeToFailure,
        recommendedActions,
        criticalComponents,
    };
});
exports.analyzeFailureRisk = analyzeFailureRisk;
