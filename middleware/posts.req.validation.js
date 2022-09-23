const { body, param } = require('express-validator');
const Post = require('../models/posts.models');

/* vérification de la conformité de l'Id post */
const idPost = [
    param('id')
    .isString()
    .withMessage(' Bad argument ! ')
    .custom(value => {
        /* vérification que le post éxiste */
        return Post.findAll({ where : { id: value } })
            .then( result => {
                if (result[0]){
                    return true;
                } else {
                    return Promise.reject(' Unknown post ')
                }
            });
    })    
];

const like = [
    body('like')
    .exists({ checkNull: true})
    .withMessage(' An argument is missing ! ')
    .isBoolean()
    .withMessage(' Bad argument ! ')
];

const postElement = (req, res, next) => {
    try {
        const postObject = {};
        if (req.file) {
            if (req.body.post) {
                postObject.text = JSON.parse(req.body.post).text;
            }
            postObject.imgUrl = `${ req.protocol }://${ req.get('host') }/resources/images/${ req.file.filename }`;
        } else if (req.body.text) {
            postObject.text = req.body.text;
        }
    

        if (!postObject.hasOwnProperty('text') && !postObject.hasOwnProperty('imgUrl') ){
            throw ' Missings arguments';
        } else {
            if ((postObject.text) && (typeof(postObject.text) !== 'string')) {
                throw ' Bad arguments';
            }
        }
        
        req.postObject = postObject;

        next();

    } catch(error) {
        res.status(400).json({ message : error });
    }
};

module.exports = { idPost, like, postElement };