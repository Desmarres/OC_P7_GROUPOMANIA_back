/* importation des ressources*/
const express = require('express');
const router = express.Router();
const validationResult = require('../middleware/validationResult');
const userValidation = require('../middleware/user.req.validation');
const userCtrl = require('../controllers/users.controllers');
const reqAuth = require('../middleware/req.auth');

/* routage des requêtes */
router.get('/', reqAuth, userCtrl.getAuth);

router.get('/mail', reqAuth, userCtrl.mail);

router.post('/signup', userValidation.signup, // vérification des éléments envoyés
    validationResult, // vérification de la présence d'erreur dans les entrées
    userCtrl.signup); // accès au controleur de la requête

router.post('/login', userValidation.login, // vérification des éléments envoyés
    validationResult, // vérification de la présence d'erreur dans les entrées
    userCtrl.login); // accès au controleur de la requête

module.exports = router;