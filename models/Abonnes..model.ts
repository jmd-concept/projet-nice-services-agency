import { DataTypes, Model } from 'sequelize';
import sequelize from "@/lib/db/sequelize";

class Abonnes extends Model { }

Abonnes.init({
    id_abonner: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            isLowercase: true // On force le minuscule pour éviter les doublons
        }
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
}, {
    sequelize,
    tableName: "abonnes",
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

export default Abonnes;