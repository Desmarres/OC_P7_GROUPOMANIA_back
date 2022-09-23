/* importation des ressources*/
const fs = require('fs');
const Post = require('../models/posts.models');
const User = require('../models/users.models');
const Liked = require('../models/likeds.models');

async function adminAccess(userId){
    return await User.findAll({
        attributes: ['adminAccess'],
        where: {id : userId}
    })
        .then(user => { return user[0].adminAccess })
}

/* récupère l'ensemble des posts de la BDD */
exports.getAllPost =(req, res, next) => {
    Post.findAll()
        .then( posts => res.status(200).json(posts))
        .catch( error => res.status(500).json({ error }));
};

/* récupère l'ensemble des posts de la BDD dans l'ordre inverse de création */
exports.getAllPostOrderCreatedDesc =(req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then( posts => res.status(200).json(posts))
        .catch( error => res.status(500).json({ error }));
};

/* récupère l'ensemble un post de la BDD */
exports.getOnePost =(req, res, next) => {
    Post.findAll({ where: {id : req.params.id} })    
        .then( post => res.status(200).json(post[0]))
        .catch( error => res.status(500).json({ error }));
};

/* ajoute un post de la BDD */
exports.createPost =(req, res, next) => {
    Post.create({
            text : req.postObject.text,
            imgUrl : req.postObject.imgUrl,
            UserId : req.auth.userId
        })
        .then(() => res.status(201).json({ message : 'The post is created !'}) )
        .catch( error => res.status(500).json({ error }))
};

/* modifie un post de la BDD */
exports.modifyPost = (req, res, next) => {
    Post.findAll({ where: {id : req.params.id} })    
        .then( async post => {
            /* vérification du compte admin */
            const authorization = await adminAccess(req.auth.userId);
            
            /* vérification si l'Id utilisateur est le même que dans la BDD*/
            if (post[0].UserId != req.auth.userId && !authorization) {
                res.status(403).json({ message : " 403: unauthorized request " });
            }
            else {
                if ( req.file ) {
                    /* récupération de l'URL de l'image*/
                    const filename = post[0].imgUrl.split('/images/')[1];
                    /* suppression de l'image dans le dossier*/
                    fs.unlink(`resources/images/${filename}`, ( error ) => {
                        if (error) throw error;
                        console.log( ' Old image removed from folder ! ');
                    });
                }

                const postObject = {};
                postObject.text = req.postObject.text ? req.postObject.text : post[0].text;
                postObject.imgUrl = req.postObject.imgUrl ? req.postObject.imgUrl : post[0].imgUrl;

                Post.update({
                        text : postObject.text,
                        imgUrl : postObject.imgUrl,
                    }, {
                        where : { id : post[0].id }
                    })
                    .then(() => res.status(200).json({ message: " Modification of the post successful ! " }))
                    .catch( error => res.status(500).json({ error }));
            }
        })
        .catch( error => res.status(500).json({ error }));
};

/* supprime un post de la BDD */
exports.deletePost =(req, res, next) => {
    Post.findAll({ where: {id : req.params.id} })
        .then( async post => {
            /* vérification du compte admin */
            const authorization = await adminAccess(req.auth.userId);

            /* vérification si l'Id utilisateur est le même que dans la BDD*/
            if (post[0].UserId != req.auth.userId && !authorization) {
                res.status(403).json({ message : " 403: unauthorized request " });
            }
            else {
                if ( post[0].imgUrl !== null ) {
                    /* récupération de l'URL de l'image*/
                    const filename = post[0].imgUrl.split('/images/')[1];
                    /* suppression de l'image dans le dossier*/
                    fs.unlink(`resources/images/${filename}`, ( error ) => {
                        if (error) throw error;
                        console.log( ' Image removed from folder ! ');
                    });
                }
                Post.destroy({
                        where : { id : post[0].id }
                    })
                    .then(() => res.status(200).json({ message : ' The post has been removed ! ' }))
                    .catch( error => res.status(500).json({ error }));
            }
        })
        .catch( error => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
    Liked.findAll({
        where : {
            UserId : req.auth.userId,
            PostId : req.params.id
        }})
        .then( liked => {
            if (!(liked[0]) && (req.body.like == true)) {
                Liked.create({
                    UserId : req.auth.userId,
                    PostId : req.params.id
                })
                .then(() => { res.status(201).json({ message : 'The post is liked !'}) })
                .catch( error => { res.status(500).json({ error })});
            } else if ((liked[0]) && (req.body.like == false)) {
                Liked.destroy({
                    where : {
                        UserId : req.auth.userId,
                        PostId : req.params.id
                    }})                    
                    .then(() => { res.status(201).json({ message : 'The post is not liked !'}) })
                    .catch( error => { res.status(500).json({ error })});
            } else {
                res.status(201).json({ message : 'The like of the post is not modify !'});
            };
        })
        .catch( error => res.status(500).json({ error }) );
};