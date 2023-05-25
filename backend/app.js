const express = require('express');
const mariadb = require('mariadb');
const horseRoutes = require('./routes/r_horse');
const paymentsRoutes = require('./routes/r_payment');
const abonnementRoutes = require('./routes/r_abonnement');
const evenement = require('./routes/r_evenement')
const concours = require('./routes/r_acceuil')
const pool = require('./db');
require('dotenv').config({path :'.env-local'});

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use("/api/payments", paymentsRoutes);
/**
 * Si requete /api/payment renvoie vers le routeur /routes/cl_payment.js
 * Voir la suite des explications dans le fichier /routes/cl_payment.js
 */
app.use("/api/horse", horseRoutes);
/**
 * Tout ce que j'ai noté dans celui du dessus qui renvoie à payments
 * est similaire à celui ci mais celui ci renvoie au
 * routeur /routes/cl_horse.js
 * et derrière au controller /controllers/cl_horse.js
 */

// app.use(express.urlencoded({extended:true}));
app.use('/api/abonnement', abonnementRoutes);

app.use('/api/evenement', evenement);
app.use('/api/concours', concours);
module.exports = app;

