// Ajout de plugin externe
const express = require('express');
const router = express.Router();

// Ajout du controllers
const userCtrl = require('../controllers/user');

// Déclaration des routes avec lien vers la function du controller
router.post('/signup', userCtrl.signup);    // Chiffre le mot de passede l'utilisateur, ajoutel'utilisateur à la base dedonnées
router.post('/login', userCtrl.login);      // Vérifie les informationsd'identification del'utilisateur, enrenvoyant l'identifiantuserID depuis la basede données et un jetonWeb JSON signé(contenant égalementl'identifiant userID)

module.exports = router;