const express = require('express');
const router = express.Router();

const evenementCtrl = require('../controllers/cl_evenement');
const pool = require("../db");

router.get('/', evenementCtrl.evenement);

module.exports = router;