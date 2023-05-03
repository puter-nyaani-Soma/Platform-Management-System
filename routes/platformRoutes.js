const express=require('express');
const router = express.Router();
const platformController = require('../controllers/platformController')

router.get('/viewplatforms',platformController.platforms_get)
router.get('/updateplatforms',platformController.updateplatforms_get)
router.post('/updateplatforms',platformController.updateplatforms_post)
module.exports=router;