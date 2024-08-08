import db from "../database/db.js";
import { DataTypes } from "sequelize";
import MeserosModel from "./MeserosModel.js";
import ClientesModel from "./ClientesModel.js";

const PuntuacionesModel = db.define("puntuaciones", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_mesero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amabilidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eficiencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    conocimiento_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tiempo_espera: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

//Definir relaciones
//Mesero
MeserosModel.hasMany(PuntuacionesModel, {foreignKey: 'id_mesero'});
PuntuacionesModel.belongsTo(MeserosModel, {foreignKey: 'id_mesero'});
//Cliente
ClientesModel.hasMany(PuntuacionesModel, {foreignKey: 'id_cliente'});
PuntuacionesModel.belongsTo(ClientesModel, {foreignKey: 'id_cliente'});

export default PuntuacionesModel;