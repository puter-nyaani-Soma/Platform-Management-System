const Train=require("../models/train")

module.exports.trains_get=(req,res) => {
    Train.find().sort({ createdAt: 1 })
    .then((result) => {
        res.render('./viewtrains', { trains: result })
    })
}
module.exports.updatetrains_post=(req,res) =>{
    var at = req.body.arrivalTime.toString();
    var at = at.substring(0, 2) + at.substring(3, 5);
    var dt = req.body.departureTime.toString();
    var dt = dt.substring(0, 2) + dt.substring(3, 5);
    req.body.arrivalTime = at;
    req.body.departureTime = dt;
    const train = new Train(req.body);
    train.save()
        .then((result) => {
            res.redirect('/viewPlatforms')
        })
        .catch((err) => {
            console.log(err);
        })
}