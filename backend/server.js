//imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')


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

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../build')))

// Anything that doesn't match the above, send back index.html

//production mode
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, '../build')));  //  
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = '../build/index.html'));  
    })
}
//build mode
app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname+'../public/index.html'));
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