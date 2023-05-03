const jwt = require('jsonwebtoken')
const User = require('../models/users')
const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    //check if jwt exists and verified
    if(token){
        jwt.verify(token,'soma secret',(err,decodedToken) =>{
            if(err){
                console.log(err.message)
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }

        })
    }
    else{
        console.log("not loggedin")
        res.redirect('/login');
    
    }
}
//checking user
const checkUser=(req,res,next)=>{
    const token = req.cookies.jwt;
    //check if jwt exists and verified
    if(token){
        jwt.verify(token,'soma secret',async (err,decodedToken) =>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }
            else{
                console.log(decodedToken);
                let user= await User.findById(decodedToken.id)
                res.locals.user=user;
                next();
            }

        })
    }
    else{
        res.locals.user=null;
        next();
    }
}
const isAdmin =(req,res,next) => {
    if(!res.locals.user.isAdmin){
        res.redirect('/403')
    }
    else{
        next();
    }
}
module.exports = {requireAuth,checkUser,isAdmin}