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
exports.assetsRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const assets_1 = require("../data/assets.js");
const Asset = require("../models/Asset.js");
const MaintenanceLog = require("../models/MaintenanceLog.js");
exports.assetsRouter = express_1.default.Router();
// Get all assets
exports.assetsRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(assets_1.assets);
})));
// Get asset by ID
exports.assetsRouter.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = assets_1.assets.find(a => a.id === req.params.id);
    if (!asset) {
        res.status(404).json({ message: 'Asset not found' });
        return;
    }
    res.json(asset);
})));
// Create new asset
exports.assetsRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAsset = Object.assign(Object.assign({}, req.body), { id: (assets_1.assets.length + 1).toString() });
    assets_1.assets.push(newAsset);
    res.status(201).json(newAsset);
})));
// Update asset
exports.assetsRouter.put('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = assets_1.assets.findIndex(a => a.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: 'Asset not found' });
        return;
    }
    assets_1.assets[index] = Object.assign(Object.assign({}, assets_1.assets[index]), req.body);
    res.json(assets_1.assets[index]);
})));
