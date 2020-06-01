// Ajout de plugin externe
const bcrypt = require('bcrypt')        // sert a cryter une chaine de caractere
const jwt = require('jsonwebtoken');    // sert a generer un token d'authentification

// Utilisation du model de mongoDB
const User = require('../models/User')

// Creation d'une fonction pour l'enregistrement de nouvel utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //cryptage du mot de passe avec "10" passes
      .then(hash => {
        const user = new User({
          email: req.body.email,    //recuperation de l'email
          password: hash            //Récueration du mot de passe crypter
        });
        user.save() // sauvegarde des informations
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))  //OK save
          .catch(error => res.status(400).json({ error }));                     //Erreur save
      })
      .catch(error => res.status(500).json({ error }));     //erreur recuperation des données
};

// Création d'une fonction pour la gestion de login des utilisateurs
exports.login = (req, res, next) => {
User.findOne({ email: req.body.email }) // recherche de l'utilisateur en fonction de son email
    .then(user => {
    if (!user) {    // Utilisateur pas erregistré
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)    // comparaison avec le mot de passe crypter en BDD
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(            //utilisisation de jsonWebToken
                    { userId: user._id },   //gestion du UserId
                    '$2b$10$hLNQnC3nMg7RQgnrDcdj9Oltl.UBmGruFCuNz2G.y33AjMgLJEJbq', // clé de cryptage
                    { expiresIn: '24h' }    // temps de validité
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};