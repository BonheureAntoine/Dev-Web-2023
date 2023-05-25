const express = require('express');
const router = express.Router();

const concoursCtrl = require('../controllers/cl_acceuil');
const pool = require("../db");

router.get('/', concoursCtrl.concours);

module.exports = router;