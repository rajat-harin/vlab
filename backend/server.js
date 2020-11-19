//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//express app creation
const app = express();
const port = process.env.PORT || 5000;


//middlewares
app.use(cors());
app.use(express.json());
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