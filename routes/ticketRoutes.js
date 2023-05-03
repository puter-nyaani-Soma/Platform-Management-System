const {Router}=require('express')
const router = Router()
const ticketController = require('../controllers/ticketController')
router.get('/booktickets',ticketController.book_get);
router.post('/booktickets',ticketController.book_post);
router.get('/viewticket',ticketController.view_get);
module.exports = router;