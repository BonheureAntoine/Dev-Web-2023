const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/cl_abonnement');
const pool = require("../db");

const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'https://equimanagement/api/abonnement',
    issuerBaseURL: `https://dev-nlsmejlnkpumpmbb.eu.auth0.com/`,
});

router.get('/user/:id', checkJwt, userCtrl.user);
router.get('/logs/:id', userCtrl.logs);
router.post('/operation', userCtrl.operation)

module.exports = router;