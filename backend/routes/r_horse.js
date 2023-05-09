const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/cl_horse');
const pool = require("../db");

router.get('/options', userCtrl.options);
router.post('/addHorse', userCtrl.addHorse);
router.get('/getHorseOptn/:id', userCtrl.getHorseOptn);

module.exports = router;