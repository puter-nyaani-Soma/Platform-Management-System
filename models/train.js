const mongoose = require('mongoose')
const Schema = mongoose.Schema
const trainSchema = new Schema({
    trainNo:{
        type: Number,
        required: true
    },
    trainType:{
        type: String,
        required: true
    },
    arrivalTime:{
        type: Number,
        required: true

    },
    departureTime:{
        type: Number,
        required: true
    },
    
    platformNo:{
        type: Number,
        default: -1,
        min:-1,
    },
    from:{
        type:String
    },
    to:{
        type:String
    },
    trainName:{
        type:String
    },
    availableSeats:{
        type:Number,
        default:10
    }

},{timestamps:true})

// trainSchema .pre('save',async function(){
//     let filter = {trainNo:-1};
//    let update = {trainNo:this.trainNo};
//     console.log("adding trains")
//     Platform.findOneAndUpdate(filter,update)
//     .then(result => {   
//         if(result){
        
//         console.log("train assinged to platform",result.platformNo)
//         this.platformNo = result.platformNo;
//         }
//         else{
//             this.platformNo=-1;
//             console.log("Train is waiting")
//         }
//     });
//  })
trainSchema.statics.update = async function (tNo,pNo) {
    const update = { platformNo:pNo  };
    const filter = { trainNo:tNo };
    
  
    await Train.findOneAndUpdate(filter, update);
  }


const Train=mongoose.model('Train',trainSchema)
module.exports=Train;