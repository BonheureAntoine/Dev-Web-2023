const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/cl_horse');
const pool = require("../db");

router.get('/', userCtrl.getHorses);
router.get('/options', userCtrl.options);
router.post('/', userCtrl.addHorse);


module.exports = router;