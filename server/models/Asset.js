"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../db/config");

const { sequelize } = require('../db/config');

class Asset extends sequelize_1.Model {
}

exports.Asset = Asset;
Asset.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('operational', 'maintenance', 'repair', 'offline'),
        allowNull: false,
    },
    lastMaintenance: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    nextMaintenance: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    healthScore: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    purchaseDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    manufacturer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    operatingHours: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    temperature: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    vibration: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    noise: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Asset',
});

module.exports = Asset;
