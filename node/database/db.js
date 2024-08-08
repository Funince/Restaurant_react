import {Sequelize} from 'sequelize';

const db= new Sequelize('restaurante', 'root','admin',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;