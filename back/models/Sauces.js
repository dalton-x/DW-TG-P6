const mongoose = require('mongoose');

// creation du model de sauvegarde dans mongoDB
const saucesShema = mongoose.Schema({
    userId: { type: String, require: true},                       // UserId du createur
    name: { type: String, require: true},                         // Nom de la sauce
    manufacturer: { type: String, require: true},                 // Créateur de la sauce
    description: { type: String, require: true},                  // description de la sauce
    mainPepper: { type: String, require: true},                   // Ingredients qui pimente la sauce
    imageUrl: { type: String, require: true},                     // Adresse de l'image de presentation de la sauce
    heat: { type: Number, require: true},                         // Force de piquant de la sauce
    likes: { type: Number, default:0, require: true},             // nombre de Like reçut
    dislikes: { type: Number, default:0, require: true},          // nombre de dislike reçut
    usersLiked: { type: Array, default:[], require: true},        // Utilisateurs qui Like la sauce
    usersDisliked: { type: Array, default:[], require: true},     // Utilisateur qui DisLike la sauce
});

module.exports = mongoose.model('Sauces',saucesShema);