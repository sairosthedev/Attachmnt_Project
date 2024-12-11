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
exports.maintenanceRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const maintenance_1 = require("../data/maintenance.js");
exports.maintenanceRouter = express_1.default.Router();
// Get all maintenance logs
exports.maintenanceRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(maintenance_1.maintenanceLogs);
})));
// Get maintenance logs by asset ID
exports.maintenanceRouter.get('/asset/:assetId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logs = maintenance_1.maintenanceLogs.filter(log => log.assetId === req.params.assetId);
    res.json(logs);
})));
// Create new maintenance log
exports.maintenanceRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newLog = Object.assign(Object.assign({}, req.body), { id: (maintenance_1.maintenanceLogs.length + 1).toString(), date: new Date().toISOString() });
    maintenance_1.maintenanceLogs.push(newLog);
    res.status(201).json(newLog);
})));
