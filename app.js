const express = require('express');

const mongoose = require('mongoose');

const morgan = require('morgan')

const app = express();

const cookieParser = require('cookie-parser');

const session = require('express-session');

const Platform = require('./models/platform');
const Train = require('./models/train');

const complainRoutes = require('./routes/complainRoutes');
const authRoutes = require('./routes/authRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const trainRoutes = require('./routes/trainRoutes')
const platformRoutes = require('./routes/platformRoutes')
const { requireAuth, checkUser, isAdmin } = require('./middleware/authMiddleware')


app.use(express.static('../core'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    secret: 'soma secret',
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('DB Connection Established!')
})
app.listen(3000)

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.use(express.urlencoded({ extended: true }))


app.get('*', checkUser);

app.use(complainRoutes);

app.use(authRoutes);

app.use(ticketRoutes);

app.use(trainRoutes);

app.use(platformRoutes);



app.get('/', (req, res) => {
    res.render('./home.ejs', { root: (__dirname) })
})

app.get('', (req, res) => {
    res.render('./home.ejs', { root: (__dirname) })
});

app.get('/home', (req, res) => {
    res.render('./home.ejs', { root: (__dirname) })
});



app.get('/profile', requireAuth, (req, res) => {
    res.render('./details.ejs')
})




app.get('/403', (req, res) => {
    res.render('./404', { code: 403, heading: "Forbidden Access", message: "Boo, looks like a ghost aint letting u go to this page" })

})
app.use((req, res, next) => {
    res.render('./404', { code: 404, heading: "Page Not Found", message: "Boo, looks like a ghost stole this page!" })
})


//platform assigning logic

const assignPlatform = async () => {
    Train.findOne({ platformNo: -1 })
        .then(result => {
            if (result) {
                console.log("found waiting train", result.trainNo);
                Platform.findOneAndUpdate({ trainNo: -1 }, { trainNo: result.trainNo })
                    .then(result1 => {
                        if (result1) {
                            console.log("\nFound free platform", result1.platformNo)
                            Train.findOneAndUpdate({ trainNo: result.trainNo }, { platformNo: result1.platformNo })
                                .then(result2 => {
                                    Platform.findByIdAndUpdate({ platformNo: result1.platformNo }, { trainNo: result.trainNo })
                                })
                        }
                        else {
                            console.log("no freeplatform ")
                        }
                    })
            }
            else {
                console.log("no train is waiting")
            }
        });
}

const freePlatforms = async () => {
    time = new Date();
    let hours = time.getHours().toString();
    let minutes = time.getMinutes().toString();
    if (minutes < 10) {
        minutes = minutes.toString();
        minutes = '0' + minutes
    }
    let currTime = Number(hours + minutes);
    let filter = { departureTime: { $lt: currTime } };
    //global.dno=0;
    Train.findOneAndUpdate({ departureTime: { $lt: currTime } }, { platformNo: 99 })
    .then(result => {
            if (result) {
                console.log("found left train", result.trainNo);
                console.log("Deleted entry from ", result.platformNo)
                let filter1 = { platformNo: result.platformNo };
                let update1 = { trainNo: -1 };
                Platform.findOneAndUpdate(filter1, update1)
                    .then(result1 => {
                        console.log(result1);
                        console.log("platform updated")

                    });
            }
        })
    }
    
    
    setInterval(assignPlatform,15000);
    // setInterval(freePlatforms,10000);
    
    
    
    
    
    // app.post('/updatetrains', (req, res) => {
    //     console.log(req.body);
    //     var at = req.body.arrivalTime.toString();
    //     var at = at.substring(0, 2) + at.substring(3, 5);
    //     var dt = req.body.departureTime.toString();
    //     var dt = dt.substring(0, 2) + dt.substring(3, 5);
    //     req.body.arrivalTime = at;
    //     req.body.departureTime = dt;
    //     console.log(req.body)
    //     const train = new Train(req.body);
    //     train.save()
    //         .then((result) => {
    //             res.redirect('/viewPlatforms')
    //         })
    //         .catch((err) => {
        //             console.log(err);
        //         })
    // })
    
    // app.get('/viewtrains', (req, res) => {
    //     Train.find().sort({ createdAt: 1 })
    //         .then((result) => {
        //             res.render('./viewtrains', { trains: result })
    //         })
    // });
    
    // app.get('/viewplatforms', (req, res) => {
    //     Platform.find().sort({ createdAt: 1 })
    //         .then((results) => {
    //             Train.find(results._id)
    //                 .then((result) => {
    //                     res.render('./viewPlatforms', { platforms: results, trains: result })
    //                 })
    //         })
    // });
    
    
    // app.get('/updatePlatforms', requireAuth, isAdmin, (req, res) => {
    
    //     Train.find()
    //         .then((results) => {
    //             console.log(results)
    //             if (results) {
    //                 console.log("in")
    //                 res.render('./updatePlatforms.ejs', { trains: results })
    
    //             }
    //             else {
    //                 res.redirect('/404')
    //             }
    //         })
    // });