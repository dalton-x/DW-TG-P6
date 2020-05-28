// Ajout de plugin externe
const express = require('express');
const router = express.Router();

// Ajout du controllers
const userCtrl = require('../controllers/user');

// Déclaration des routes avec lien vers la function du controller
router.post('/signup', userCtrl.signup);    // Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base dedonnées
router.post('/login', userCtrl.login);      // Vérifie les informations d'identification de l'utilisateur, enrenvoyant l'identifiant userID depuis la base de données et 
                                            // un TokenWeb JSON signé(contenant également l'identifiant userID)

module.exports = router;