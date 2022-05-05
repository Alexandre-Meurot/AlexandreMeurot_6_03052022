const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

mongoose
    .connect(
        "mongodb+srv://alex:CIN9brVByctjJJ1D@cluster0.fkp7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use('/api/auth', userRoutes);

module.exports = app;
