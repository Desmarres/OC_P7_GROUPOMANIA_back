/* importation des ressources*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

/* enregistrement nouvel utilisateur*/
exports.signup =(req, res, next) => {
    
    /* hachage du password*/
    bcrypt.hash(req.body.password,10)
        .then(async passwordHash => {
            /* crétaion de l'objet utilisateur et enregistrement dans la BDD*/
            const user = await User.create({
                loginMail : req.body.email,
                passwordCrypt: passwordHash
            })
                .then(() => res.status(201).json({ message: ' User create ! ' }))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

/* vérification de la connection*/
exports.login = (req, res, next) => {
    /* récupération de l'utilisateur dans la BDD*/
    User.findAll({ where: {loginMail : req.body.email} })
        .then(result => {
            user = result[0];
            /* vérification si le password envoyé correspond à celui de la BDD*/
            bcrypt.compare(req.body.password, user.passwordCrypt)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: ' Incorrect login/password pair ! ' });
                    }
                    /* renvoi du token d'authentification pour 24h*/
                    res.status(200).json({
                        token: jwt.sign(
                                { userId: user.id },
                                process.env.TOKEN || 'token',
                                { expiresIn: process.env.TOKEN_EXPIRATION || '1h' }
                            )
                    });
                })
                .catch( error => res.status(500).json({ error }));
        })
        .catch( error => res.status(401).json({ message: ' Incorrect login/password pair ! ' }));
 };