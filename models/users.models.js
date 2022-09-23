/* importation des ressources*/
const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/db.config');

/* modèle User*/
const User = db.define('User', {
    loginMail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passwordCrypt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adminAccess: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: false
});

module.exports = User;