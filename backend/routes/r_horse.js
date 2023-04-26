const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/cl_horse');
const pool = require("../db");

router.get('/coat', userCtrl.coat);
router.get('/breed', userCtrl.breed);
router.get('/breeder', userCtrl.breeder);
router.get('/getHorses', userCtrl.getHorses);

module.exports = router;