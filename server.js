//jshint esversion: 6
//Loading Modules*
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const dotenv = require('dotenv');
var session = require('express-session');
var notesRouter = require('./server/routes/notes');

// Load Assets*
const app = express();

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Dotenv*
dotenv.config({
    path: 'config.env'
});

// Log requests*
app.use(morgan('tiny'));

// Server Port*
const port = process.env.PORT || 5000;

//Parsing requests to bodyparser*
app.use(session({
    secret: 'randomsecretkey1234',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse requests in json*
app.use(bodyParser.json());

// View Engine (EJS)*
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

//load routers*
app.use('/', require('./server/routes/notes'));

//Listen to PORT 3000*
app.listen(port, () => {
    console.log('server is listening on port 3000');
});
