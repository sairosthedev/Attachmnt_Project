"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db/config');
const Asset = require('./Asset');

class MaintenanceLog extends Model {}

MaintenanceLog.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    assetId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Assets', 
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('routine', 'repair', 'emergency'),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    technician: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    findings: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    partsReplaced: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'MaintenanceLog',
});

Asset.hasMany(MaintenanceLog, { foreignKey: 'assetId' });
MaintenanceLog.belongsTo(Asset, { foreignKey: 'assetId' });

module.exports = MaintenanceLog;
