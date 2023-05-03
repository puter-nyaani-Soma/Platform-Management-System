const Ticket = require('../models/ticket')
const Train = require('../models/train')
module.exports.book_get=(req,res) => {
    Train.find().sort({ createdAt: 1 })
        .then((result) => {

            if(result){
            res.render('./booktickets',  {root:(__dirname),trains: result })
            }
            else{
                res.render('./booktickets',{root:(__dirname)})

            }
        })
}
module.exports.book_post=(req,res) =>{
  
        Train.findOne({ trainNo: req.body.trainNo })
            .then((result) => {
                if (result) {
                    if (result.availableSeats < req.body.numberOfPassengers) {
    
                        res.status(400).json({ errors: "sorry required seats arent available" })
                    }
                    else {
                        result.availableSeats -= req.body.numberOfPassengers;
    
                        let passengerList = [];
                        let i = 0, j = 0, k = 0;
                        if (req.body.numberOfPassengers > 1) {
                            req.body.passengerList += '$'
                            while (req.body.passengerList[i] != '$') {
    
                                if (req.body.passengerList[i] == '-') {
                                    k = i;
                                }
                                if (req.body.passengerList[i] == ',') {
    
                                    passengerList.push({ name: req.body.passengerList.substring(j, k), age: Number(req.body.passengerList.substring(k + 1, i)) })
                                    j = i + 1;
                                    i++;
    
                                }
                                i++;
                            }
                            passengerList.push({ name: req.body.passengerList.substring(j, k), age: Number(req.body.passengerList.substring(k + 1, i)) })
                        }
                        // Create a new ticket object
    
                        if (req.body.numberOfPassengers > 1) {
    
                            const newTicket = new Ticket({
                                trainNo: req.body.trainNo,
                                passengerName: req.body.passengerName,
                                passengerAge: req.body.passengerAge,
                                boarding: req.body.boarding,
                                destination: req.body.destination,
                                passengerList: passengerList,
                                numberOfPassengers: Object.keys(passengerList).length + 1
    
                            });
                            // Save the new ticket to the database
                            newTicket.save()
                                .then((result1) => {
    
    
                                    req.session.ticket = result1
                                    console.log("datad" + req.session.ticket)
                                    res.status(201).json({ ticket: result1 })
                                });
                        }
                        else {
                            const newTicket = new Ticket({
                                trainNo: req.body.trainNo,
                                passengerName: req.body.passengerName,
                                boarding: req.body.boarding,
                                destination: req.body.destination,
                                numberOfPassengers: req.body.numberOfPassengers
    
                            });
                            // Save the new ticket to the database
                            newTicket.save()
                                .then((result1) => {
    
                                    req.session.ticket = result1
                                    console.log("datad" + req.session.ticket)
                                    res.status(201).send({ ticket: result1 })
                                });
    
                        }
                        return result.save()
                    }
                }
                else {
                    res.status(400).json({ errors: "sorry Unknown Train" })
                }
            })
    

}
module.exports.view_get=(req,res) =>{
    res.render('./viewticket',{root:(__dirname), ticket: req.session.ticket })
}