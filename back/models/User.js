const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// creation du model de sauvegarde dans mongoDB
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },  // Email de l'utilisateur avec une gestion unique de l'email 
  password: { type: String, required: true }              // ernegistrement du mot de pass
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);