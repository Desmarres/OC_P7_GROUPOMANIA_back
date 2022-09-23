/* importation des ressources*/
const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/db.config');

/* modèle Post*/
const Post = db.define('Post', {
    text: {
        type: DataTypes.TEXT
    },
    imgUrl: {
        type: DataTypes.STRING
    }
});

module.exports = Post;