const passwordSchema = require("../models/Password");

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    res.writeHead(
      400,
      "Le mot de passe doit comprendre 8 caractères minimum dont une majuscule, un chiffre, et sans espaces",
      {
        "content-type": "application/json",
      }
    );
    res.end("Le format du mot de passe est incorrect");
  }
};
