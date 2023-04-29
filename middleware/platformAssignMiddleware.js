const Train = require('../models/train')
const Platform = require('../models/platform')

const assignPlatform =async () =>{
time = new Date()
let hours = time.getHours().toString();
let minutes = time.getMinutes().toString();
let currTime=hours + minutes;
let filter={ trainNo:-1};
let b = getWaitingTrain();
let update ={ trainNo:b};

await Platform.findOneAndUpdate(filter, update);
await Train.findOneAndUpdate(update, filter);
}