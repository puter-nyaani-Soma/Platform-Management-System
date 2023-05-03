const express=require('express');
const router=express.Router();
const Complain =  require('../models/complain');
const { requireAuth } = require('../middleware/authMiddleware');
const complainController = require('../controllers/complainController')

router.get('/complains',requireAuth,complainController.complain_get);
router.post('/complain',complainController.complain_post);
router.get('/allcomplains',complainController.allcomplains_get);
router.post('/allcomplains',complainController.allcomplains_post);
  
module.exports=router;
