/* importation des ressources*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { db } = require('./config/db.config');
const modelsSync = require('./config/models.config');
const dbAuth = require('./middleware/db.auth');
const reqAuth = require('./middleware/req.auth');

/* fichiers routes des requêtes*/
const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');

// Test de la connection à la BDD
dbAuth(db);

// Synchronisation des models avec la BDD
modelsSync();

/* appel de la méthode express*/
const app = express();

/* middleware d'extraction du corps JSON*/
app.use(express.json());

/* gestion des erreurs de CORS*/
const corsOptions = {
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
    methods: 'GET, POST, PUT, DELETE'
}

app.use(cors(corsOptions));


/* routage des requêtes */
app.use('/api/auth/', usersRoutes);
app.use('/api/post/', reqAuth, postsRoutes);
app.use('/resources/images', express.static(path.join(__dirname, 'resources/images')));

module.exports = { app };