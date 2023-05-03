const express=require('express');
const router=express.Router();
const { requireAuth ,isAdmin} = require('../middleware/authMiddleware');
const complainController = require('../controllers/complainController')

router.get('/complains',requireAuth,complainController.complain_get);
router.post('/complain',complainController.complain_post);
router.get('/allcomplains',isAdmin,complainController.allcomplains_get);
router.post('/allcomplains',complainController.allcomplains_post);
  
module.exports=router;
