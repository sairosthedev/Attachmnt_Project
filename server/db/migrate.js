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
const config_js_1 = require("./config.js");
const Asset_js_1 = require("../models/Asset.js");
const MaintenanceLog_js_1 = require("../models/MaintenanceLog.js");
const date_fns_1 = require("date-fns");
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_js_1.sequelize.sync({ force: true });
        // Create sample assets
        const asset1 = yield Asset_js_1.Asset.create({
            name: 'Excavator XC-200',
            type: 'Heavy Equipment',
            status: 'operational',
            lastMaintenance: new Date(),
            nextMaintenance: (0, date_fns_1.addDays)(new Date(), 5),
            healthScore: 92,
            location: 'Site A',
            purchaseDate: '2023-01-15',
            manufacturer: 'CAT',
            operatingHours: 1200,
            temperature: 85,
            vibration: 0.5,
            noise: 75,
        });
        yield MaintenanceLog_js_1.MaintenanceLog.create({
            assetId: asset1.id,
            date: new Date(),
            type: 'routine',
            description: 'Regular maintenance check',
            cost: 500,
            technician: 'John Smith',
            findings: 'All systems normal',
            partsReplaced: ['Air filter', 'Oil filter'],
        });
        console.log('Migration completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
});
migrate();
