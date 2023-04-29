const mongoose=require('mongoose')
const Schema=mongoose.Schema
const complainSchema = new Schema({ 
    username:{
        type: 'string',
        required: true
    },
    complain:{
        type: 'string',
        required: true
    }
},{timestamps:true})

const Complain=mongoose.model('Complain',complainSchema);
module.exports=Complain;