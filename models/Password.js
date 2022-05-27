const passwordValidator = require("password-validator");

//----------------------------------------
// Création d'un schéma password-validator
//----------------------------------------
const passwordSchema = new passwordValidator();

passwordSchema
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

module.exports = passwordSchema;
