import db from "../database/db.js";

import { DataTypes } from "sequelize";

const MerseroModel = db.define("meseros", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DNI: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    unique: true,
  },
});

export default MerseroModel;
