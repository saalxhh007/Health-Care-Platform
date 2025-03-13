import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Doctor = sequelize.define("Doctor", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cabinet_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availabalite: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});