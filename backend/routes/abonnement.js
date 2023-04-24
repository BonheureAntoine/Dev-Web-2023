const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/abonnementCtrl');
const pool = require("../db");

router.get('/user/:id', userCtrl.user);
router.get('/logs/:id', userCtrl.log);
router.post('/operation', userCtrl.operation)

module.exports = router;