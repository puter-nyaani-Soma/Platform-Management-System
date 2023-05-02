const User = require('../models/users')
const jwt=require('jsonwebtoken')

const handleErrors = (err) =>{
    
    let errors = {email:'',username:'',password:''};
    console.log(err.message,err.code);

    //duplicate error
    if(err.code ===11000){
       if(err.message.includes('email')){
        errors['email']='email already in use';
       }
       if(err.message.includes('username')){
        errors['username']='username already in use';
       }
   }

    // validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path]= properties.message;
        });
    }

    //incorrect creds
    if(err.message.includes('Thavarana Password')){
        errors['password']='Check your password!!!!'
    }
    if(err.message.includes('Thavarana Username')){
        errors['username']='Check your username!!!!!'
    }
    return errors
}
const maxAge = 60*60;
const createToken =(id)=>{
    return jwt.sign({ id },'soma secret',{ 
        expiresIn: maxAge
    });
}

module.exports.register_get=(req,res) =>{
        res.render('./register.ejs',{root:(__dirname)});
    }
module.exports.register_post= async(req,res) =>{
        const {email , username,password} = req.body;
        try{
           const user= await User.create({email:email,username:username,password:password});
           const token = createToken(user._id);
           res.cookie('jwt',token,{ httpOnly:true, maxAge:1000*60*60})
           res.status(201).send({user:user._id});
           
        }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
         
    }
module.exports.login_get=(req,res) =>{
        res.render('./login.ejs',{root:(__dirname)});
    }
module.exports.login_post = async (req, res) => {
        const { username, password } = req.body;
        try {
          const user = await User.login(username, password);
          const token = createToken(user._id);
          res.cookie('jwt',token,{ httpOnly:true, maxAge:1000*60*60})
          res.status(200).json({ user:user._id });
          
        } catch (err) {
          const errors=handleErrors(err);
          res.status(400).json({errors});
        }
      }
module.exports.logout_get = (req,res) => {
    res.cookie('jwt','',{maxAge:1})
    res.cookie('uid','',{maxAge:1})
    res.redirect('/home')
}