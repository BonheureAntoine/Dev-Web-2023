const { generateUploadURL } = require('../s3.js');

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/cl_horse');
const pool = require("../db");

router.get('/', userCtrl.getHorses);
router.get('/options', userCtrl.options);
router.post('/', userCtrl.addHorse);

express().use(express.static('front'))
router.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})


module.exports = router;