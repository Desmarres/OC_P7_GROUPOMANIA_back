/* importation des ressources*/
const User = require('../models/users.models');
const Post = require('../models/posts.models');
const Liked = require('../models/likeds.models');

async function modelSync() {
    User.belongsToMany(Post, { through: Liked });
    Post.belongsToMany(User, { through: Liked });
    User.hasMany(Post);
    await User.sync();
    await Post.sync();
    await Liked.sync();
    console.log("Synchronization successful");
};

module.exports = modelSync;