const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/cl_abonnement');
const pool = require("../db");

router.get('/user/:id', userCtrl.user);
router.get('/logs/:id', userCtrl.logs);
router.post('/operation', userCtrl.operation)

module.exports = router;