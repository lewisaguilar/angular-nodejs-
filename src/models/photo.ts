import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Photo = sequelize.define('photo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, )


export interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
}

