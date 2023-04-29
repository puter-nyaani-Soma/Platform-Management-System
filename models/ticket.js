const Train = require('./train')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

passengerSchema = new Schema({
name:{
    type: String,

},
age:{
    type: String,
}
})

const ticketSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId },
    ticketNo:{
        type: String
    },
    trainNo:{
        type: Number,
        required: true
    },
    trainName:{
        type: String,
        default:"No Details"
    },
    boarding:{
        type:String,
       
    },
    destination:{
        type:String,
       
    },
    platform:{
        type:Number,
        default:-1
    },
    timeOfArrival:{
        type:Number,
        default:-1
    },
    timeOfDeparture:{
        type:Number,
        default:-1
    },
    passengerName:{
        type:String,
    },
    passengerAge:{

        type:String,
    },
    numberOfPassengers:{
        type:Number,
        default:0
    },
    passengerList:{
       type:[passengerSchema]
    },
    payment:{
        type:String,
        enum:['pending','success'],
        default:'pending'
    }
},{timestamps:true})

ticketSchema .pre('save',function(next){
    
    let filter = {trainNo:this.trainNo}
    Train.findOne(filter).then(result =>{
        // console.log("hmmmm")
       
            if (result) {
                // console.log("train found")
                // console.log(result)
                // console.log(this)
                this.trainName = result.trainName
                this.platform = result.platformNo
                this.timeOfArrival = result.arrivalTime
                this.timeOfDeparture = result.departureTime
                this.ticketNo = this.trainNo + this.boarding.substring(0, 3) + this.destination.substring(0, 3)
                // console.log(this)
                next()


            }

        
        
    }   
    )
    // console.log("hi")
   

})



const Ticket=mongoose.model('Ticket',ticketSchema);
module.exports=Ticket;