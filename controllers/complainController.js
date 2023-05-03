const Complain =  require('../models/complain');


module.exports.complain_get=(req,res)=>{
    res.render('./complains.ejs',{root:(__dirname)});
}
module.exports.complain_post=(req,res)=>{
    console.log(req.body);
    const complain =new Complain(req.body);
    complain.save()

    .then((result) => {
        
        res.redirect('/home');

    })
    .catch((err) => {
        console.log(err);  
    })
}
module.exports.allcomplains_get=(req,res)=>{
    Complain.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('./allcomplains',{complains:result})
    })
}
module.exports.allcomplains_post=(req,res) =>{
    const id = req.body.id;
    console.log('del',id)
    Complain.findByIdAndDelete(id)
      .then(result => {
        res.redirect('/allcomplains');
        
      })
      .catch(err => {
        console.log(err);
      });
}