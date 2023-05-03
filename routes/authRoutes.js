const {Router} = require('express')
const router=Router();
const authController = require('../controllers/authController')


router.get('/register',authController.register_get);
router.post('/register',authController.register_post)
router.post('/home',authController.register_post)
router.get('/login',authController.login_get)
router.post('/login',authController.login_post)
router.get('/logout',authController.logout_get)

module.exports = router;