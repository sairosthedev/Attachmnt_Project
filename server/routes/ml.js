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
exports.mlRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Asset = require('../models/Asset');
const { predictMaintenance } = require('../ml/predictMaintenance');
const failureAnalysis_js_1 = require("../ml/failureAnalysis.js");
exports.mlRouter = express_1.default.Router();
exports.mlRouter.get('/predict/:assetId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = yield Asset.findByPk(req.params.assetId);
    if (!asset) {
        res.status(404).json({ message: 'Asset not found' });
        return;
    }
    const prediction = yield predictMaintenance(asset);
    res.json(prediction);
})));
exports.mlRouter.get('/analyze/:assetId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = yield Asset.findByPk(req.params.assetId);
    if (!asset) {
        res.status(404).json({ message: 'Asset not found' });
        return;
    }
    const analysis = yield (0, failureAnalysis_js_1.analyzeFailureRisk)(asset);
    res.json(analysis);
})));
