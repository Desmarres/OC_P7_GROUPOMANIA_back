/* importation des ressources*/
const Sequelize = require('sequelize');

/* initialisation des constantes de connexions*/
const userName = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const serverName = process.env.DB_SERVER_NAME || '';
const database = process.env.DATABASE || '';

/* connection à la base de donnée MongoDB*/
const db = new Sequelize({
    database : database,
    username : userName,
    password : password,
    host: serverName,
    dialect: 'mysql'
});

module.exports = { db };