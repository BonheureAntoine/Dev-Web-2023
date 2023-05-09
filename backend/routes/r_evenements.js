const express = require('express');
const router = express.Router();

const evenementCtrl = require('../controllers/cl_evenements');
const pool = require("../db");

router.get('/', evenementCtrl.evenements);

module.exports = router;