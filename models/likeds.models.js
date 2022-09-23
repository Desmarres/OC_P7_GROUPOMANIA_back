/* importation des ressources*/
const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/db.config');
const User = require('../models/users.models');
const Post = require('../models/posts.models');

/* modèle Post*/
const Liked = db.define('Liked', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id'
      }
    }
  },{
    timestamps: false
});

module.exports = Liked;