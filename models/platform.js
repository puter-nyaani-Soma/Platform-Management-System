const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const platformSchema = new Schema ({
    platformNo:{
        type: Number,
        required: true,
        min:-1,
        max:7,
        unique: true
        
    },
    trainNo:{
        type: Number,
        default:-1,
    }

},{timestamps:true})

platformSchema.statics.update = async function (pNo,tNo) {
    const filter = { platformNo:pNo  };
    const update = { trainNo:tNo };
    const update1 = {trainNo:-1};
    await Platform.findOneAndUpdate(update, update1);
    await Platform.findOneAndUpdate(filter, update);
  }

const Platform=mongoose.model('Platform',platformSchema)
module.exports=Platform;