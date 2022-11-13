/* importation des ressources*/
const Sequelize = require('sequelize');

/* initialisation des constantes de connexions*/
const userName = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const serverName = process.env.DB_SERVER_NAME || '';
const database = process.env.DATABASE || '';
const port = process.env.DB_PORT || '';

/* connection à la base de donnée MYSQL*/
const db = new Sequelize({
    database: database,
    username: userName,
    password: password,
    host: serverName,
    port: port,
    dialect: 'mysql'
});

module.exports = { db };