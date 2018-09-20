const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();

const registerRoute = require('./api/routes/register');
const loginRoute = require('./api/routes/login');
const eventRoute = require('./api/routes/getEvents');
const prefRoute = require('./api/routes/setPreferences');

/** Connecting to DB */
mongoose.connect(
    'mongodb+srv://' +
    process.env.DB_USER + 
    ':' +
    process.env.DB_PASS + 
    '@node-stit-cy9qa.mongodb.net/test?retryWrites=true',
    {
        useMongoClient: true
    }
    )

app.use(morgan('dev'));
app.use(bodyParser.json());

/* CORS Errors Handling*/
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin', 
        '*'
    );
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
        return res.status(200).json({});
    }    
    next();
});

/** Provide API routes for user requests */
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/getEvents', eventRoute);
app.use('/setPreferences', prefRoute);

/** If no match is found for the incoming URL */
app.use((req, res, next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;