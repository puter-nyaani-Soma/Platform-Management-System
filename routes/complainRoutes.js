const express=require('express');
const router=express.Router();
const Complain =  require('../models/complain');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/complains',requireAuth,(req, res) => {
    res.render('./complains.ejs',{root:(__dirname)});
});
router.post('/complain',(req,res) => {
    console.log(req.body);
    const complain =new Complain(req.body);
    complain.save()

    .then((result) => {
        
        res.redirect('/home');

    })
    .catch((err) => {
        console.log(err);  
    })
})

router.get('/allcomplains',(req,res)=>{
    Complain.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('./allcomplains',{complains:result})
    })
    // res.render('./allcomplains.ejs',{root:(__dirname)})
})


router.post('/allcomplains', (req, res) => {
    const id = req.body.id;
    console.log('del',id)
    Complain.findByIdAndDelete(id)
      .then(result => {
        res.redirect('/allcomplains');
        
      })
      .catch(err => {
        console.log(err);
      });
  });
  
module.exports=router;
