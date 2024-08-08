import db from '../database/db.js';
import { Sequelize } from 'sequelize';

const ClientesModel = db.define('clientes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

export default ClientesModel;