const express=require('express');


const router=express.Router();

const User = require('../models/users');

router.get('/register',(req,res)=>{

    res.render('./register.ejs',{root:(__dirname)})
});
router.post('/register',(req,res) => {
    console.log(req.body);
    const user =new User(req.body);
    user.save()

    .then((result) => {
        res.redirect(`/profile/${user._id}`);

    })
    .catch((err) => {
        console.log(err);  
    })
})
router.get('/profile/:id',(req, res) => {
    const id=req.params.id;
    console.log(id)
    User.findById(id).then(result =>{
        
         res.render('./details.ejs',{user:result}) 
    })
    .catch(err =>{
        console.log(err)
    })
})


module.exports=router;