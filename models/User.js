const mongoose = require("mongoose");

// s'assure lors de l'inscription qu'on puisse utiliser qu'une seule fois la même adresse mail
const uniqueValidator = require("mongoose-unique-validator");

// modèle mongoose Utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
