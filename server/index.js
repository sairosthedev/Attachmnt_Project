"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./db/config");
const assets_1 = require("./routes/assets");
const maintenance_1 = require("./routes/maintenance");
const ml_1 = require("./routes/ml");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize database
(0, config_1.initDatabase)();
// Routes
app.use('/api/assets', assets_1.assetsRouter);
app.use('/api/maintenance', maintenance_1.maintenanceRouter);
app.use('/api/ml', ml_1.mlRouter);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
