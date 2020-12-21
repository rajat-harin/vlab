//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const compression = require('compression');


require('dotenv').config();


//express app creation
const app = express();
const port = process.env.PORT || 5000;


//helper fx
const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses if this request header is present
      return false;
    }
  
    // fallback to standard compression
    return compression.filter(req, res);
};

//middlewares
app.use(cors());
app.use(express.json());
app.use(compression())
//app.use(express.urlencoded({extended: false}));

//datebase
const uri = process.env.DB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', (err) => {
    if (err) {
        console.log('Error Connecting to database: ' + err);
    } else {
        console.log("MongoDB connection established successfully");
    }
})

//routes import
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const topicRoute = require('./routes/topic');
const uploadRoute = require('./routes/upload');

//routes connection
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/topic', topicRoute);
app.use('/upload', uploadRoute);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../build')))

// Anything that doesn't match the above, send back index.html

//production mode
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  //  
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname , 'client/build/index.html'));  
    })
}
//build mode
app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname, 'client/public/index.html'));
})



//server
app.listen(port, (err) => {
    if (err) {
        console.log('Error starting Server!!!');
        console.log(err);
    }
    else {
        console.log(`Server is Running on port: ${port}`);
    }
})