"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.predictMaintenance = exports.trainMaintenanceModel = void 0;
const tf = __importStar(require("@tensorflow/tfjs-node"));
const Asset = require("../models/Asset");
const MaintenanceLog = require("../models/MaintenanceLog");
// Feature normalization
const normalizeFeatures = (data) => {
    const tensor = tf.tensor2d(data);
    const mean = tensor.mean(0);
    const std = tensor.std(0);
    const normalized = tensor.sub(mean).div(std);
    return { normalized, mean, std };
};
// Train the model
const trainMaintenanceModel = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get historical data
    const assets = yield Asset.findAll({
        include: [MaintenanceLog],
    });
    // Prepare features and labels
    const features = assets.map(asset => [
        asset.operatingHours,
        asset.temperature,
        asset.vibration,
        asset.noise,
    ]);
    const labels = assets.map(asset => asset.status === 'repair' ? 1 : 0);
    // Normalize features
    const { normalized } = normalizeFeatures(features);
    // Create and compile model
    const model = tf.sequential({
        layers: [
            tf.layers.dense({ units: 8, activation: 'relu', inputShape: [4] }),
            tf.layers.dense({ units: 4, activation: 'relu' }),
            tf.layers.dense({ units: 1, activation: 'sigmoid' }),
        ],
    });
    model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy'],
    });
    // Train model
    yield model.fit(normalized, tf.tensor2d(labels, [labels.length, 1]), {
        epochs: 50,
        validationSplit: 0.2,
    });
    return model;
});
exports.trainMaintenanceModel = trainMaintenanceModel;
// Predict maintenance needs
const predictMaintenance = (asset) => __awaiter(void 0, void 0, void 0, function* () {
    const model = yield (0, exports.trainMaintenanceModel)();
    const features = [[
            asset.operatingHours,
            asset.temperature,
            asset.vibration,
            asset.noise,
        ]];
    const { normalized } = normalizeFeatures(features);
    const prediction = model.predict(normalized);
    const probability = yield prediction.data();
    return {
        needsMaintenance: probability[0] > 0.5,
        probability: probability[0],
    };
});
exports.predictMaintenance = predictMaintenance;
