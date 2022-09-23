/* importation des ressources*/
const jwt = require('jsonwebtoken');

/*vérification de la validité de l'authentification*/
module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message : " You are not authorized ! " });
        }
        /* récupération du token*/
        const token = req.headers.authorization.split(' ')[1];

        /*extraction de l'userId*/
        const decodedToken = jwt.verify(token, process.env.TOKEN || '' );
        const userId = decodedToken.userId;
        
        /* MAJ de l'attribut userId*/
        req.auth = {
            userId: userId
        };
    next();
    }
    catch(error) {
        res.status(401).json({ message : " You are not authorized ! " });
    }
}