//--------------------
// Requires
//--------------------
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Security Requires
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");

// Routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Start de l'application Express
const app = express();

//-----------------------------------------
// Connection à la base de données Mongoose
//-----------------------------------------
mongoose
  .connect(process.env.MONGODB_PIIQUANTE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

//-------------------------
// Paramètre d'en-tête CORS
//-------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Type, Access-Control-Allow-Headers"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Sécurité
app.use(helmet());
app.use(mongoSanitize());

//----------------------
// Paramètres des routes
//-----------------------
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
