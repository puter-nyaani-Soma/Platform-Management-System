const Platform = require('../models/platform')
const Train=require('../models/train')
module.exports.platforms_get=(req, res) => {
    Platform.find().sort({ createdAt: 1 })
        .then((results) => {
            Train.find(results._id)
                .then((result) => {
                    res.render('./viewPlatforms', { platforms: results, trains: result })
                })
        })
}

module.exports.updateplatforms_get=(req,res) =>{
    Train.find()
        .then((results) => {
            console.log(results)
            if (results) {
                
                res.render('./updatePlatforms.ejs', { trains: results })

            }
            else {
                res.redirect('/404')
            }
        })
}
module.exports.updateplatforms_post = (req, res) =>{
   
       
        let tNo = req.body.trainNo;
        let pNo = req.body.platformNo;
        Platform.update(pNo, tNo);
        Train.update(tNo, pNo);
        res.redirect('/home')
   

}