const passwordValidator = require("password-validator");

//----------------------------------------
// Création d'un schéma password-validator
//----------------------------------------
const schemaPassword = new passwordValidator();

schemaPassword
  .is()
  .min(5) // 8 caractères minimum
  .is()
  .max(30) // 30 caractères maximum
  .has()
  .uppercase(1) // doit contenir 1 majuscule
  .has()
  .lowercase() // peut contenir des minuscules
  .has()
  .digits(1) // doit contenir 1 chiffre
  .has()
  .not()
  .spaces(); // ne doit pas contenir d'espace

module.exports = (req, res, next) => {
  if (schemaPassword.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: "Le mot de passe n'est pas assez fort !",
    });
  }
};
