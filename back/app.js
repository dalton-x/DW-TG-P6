// Ajout de plugin externe
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// declaration des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// mise en place de la fonction express()
const app = express();

// adresse de connexion pour la basse de donnée MongoDB
mongoose.connect('mongodb+srv://Dalton_X:XocDMhsgIrI54Hdw@dw-tg-p6-3xktv.mongodb.net/Piquante_Sauce?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Creation des Headers pour les acces des utilisateur de l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); //Controle des adresses qui peuvent se connecter a l'API // * == All
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // reponse de la la pre-verification de la requete option
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Ajout des requete authorisé par le serveur pour le front-end
    next(); // passage au middelweare suivant
});

app.use(bodyParser.json()); //sert a parsé automatiquement le coprs de la reponse

app.use('/sauce_image', express.static(path.join(__dirname, 'sauce_image')));   //ajout de l'adresse d'un dossier static pour l'ajout de photo

// Déclaration des fichiers routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;