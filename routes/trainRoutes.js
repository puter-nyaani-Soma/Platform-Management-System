const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { isAdmin,requireAuth } = require('../middleware/authMiddleware');

router.get('/viewtrains',trainController.trains_get)
router.post('/updatetrains',trainController.updatetrains_post);
router.get('/updatetrains',requireAuth,isAdmin,trainController.updatetrains_get)
module.exports=router;