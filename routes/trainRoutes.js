const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController')

router.get('/viewtrains',trainController.trains_get)
router.post('/updatetrains',trainController.updatetrains_post);

module.exports=router;