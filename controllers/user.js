//---------------------------
// Requires
//---------------------------
const User = require("../models/User");

// Security Requires
const bcrypt = require("bcrypt");                   // Chiffrage du password dans la BDD
const cryptoJs = require ('crypto-js');             // Chiffrage du mail dans la BDD
const jwt = require("jsonwebtoken");                // Token
const emailValidator = require("email-validator");  // Vérification format email

//------------------------------------------
// Méthode de création de compte utilisateur
//------------------------------------------

exports.signup = (req, res, next) => {

    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTOJS_KEY).toString() // chiffrage du mail avant envoie à la BDD
    const isValidateEmail = emailValidator.validate(req.body.email); // vérification du format de l'email

    // Si email au bon format alors = hashage du mot de passe avec bcryptc
  if (!isValidateEmail) {
    res.writeHead(400, 'Email incorrect !"}', {
      "content-type": "application/json",
    });
    res.end("Le format de l'email est incorrect.");
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: emailCryptoJs,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

//---------------------------------
// Méthode de connexion utilisateur
//---------------------------------

exports.login = (req, res, next) => {

    const cryptedResearchedEmail = cryptoJs.HmacSHA256(req.body.email, process.env.CRYPTOJS_KEY).toString(); // décryptage du mail

  User.findOne({ email: cryptedResearchedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // vérification du mot de passe hashé avec bcrypt
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id },
                process.env.TOKEN_KEY,
                { expiresIn: "24h"}),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
