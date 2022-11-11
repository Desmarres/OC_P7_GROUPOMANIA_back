/* importation des ressources*/
const express = require('express');
const router = express.Router();
const multer = require('../config/multer.config');
const validation = require('../middleware/posts.req.validation');
const validationResult = require('../middleware/validationResult');
const postCtrl = require('../controllers/posts.controllers');

/* routage des requêtes */
router.get('/', postCtrl.getAllPost); // accès au controleur de la requête

router.get('/me', postCtrl.me);

router.get('/order/', postCtrl.getAllPostOrderCreatedDesc); // accès au controleur de la requête

router.get('/:id', validation.idPost, // vérification de la validité de l'id post de l'URL
    validationResult, // vérification de la présence d'erreur dans les entrées
    postCtrl.getOnePost); // accès au controleur de la requête

router.post('/', multer, // vérification de la conformité du fichier et stockage
    validation.postElement, // vérification des éléments du post
    validationResult, // vérification de la présence d'erreur dans les entrées
    postCtrl.createPost); // accès au controleur de la requête

router.put('/:id', validation.idPost, // vérification de la validité de l'id post de l'URL
    multer, // vérification de la conformité du fichier et stockage
    validation.postElement, // vérification des éléments descriptifs du post
    validationResult, // vérification de la présence d'erreur dans les entrées
    postCtrl.modifyPost); // accès au controleur de la requête

router.delete('/:id', validation.idPost, // vérification de la validité de l'id post de l'URL
    validationResult, // vérification de la présence d'erreur dans les entrées
    postCtrl.deletePost); // accès au controleur de la requête

router.post('/:id/like', validation.idPost, // vérification de la validité de l'id post de l'URL
    validation.like, // vérification du like
    validationResult, // vérification de la présence d'erreur dans les entrées
    postCtrl.likePost); // accès au controleur de la requête

module.exports = router;