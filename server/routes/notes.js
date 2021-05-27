//jshint esversion: 6
// define a root route
const express = require('express');
const route = express.Router();
var dbConnection = require('../db/db.config');
var userId = -1;
route.get('/login', (req, res) => {
    res.render('login');
});

route.get('/', (req, res) => {
    res.render('login');
});

route.get('/register', (req, res) => {
    res.render('register');
});

// RegisterUser*
route.post('/register', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        dbConnection.query('INSERT INTO users(username, password) VALUES (?,?)', [username, password], function (error, results, fields) {
            response.redirect('login');
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

// login user*
route.post('/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {

        // To Check If User Already Excists*
        dbConnection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                userId = results[0].ID;
                response.redirect('index');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
//Setting Log in form as a root page
route.post('/', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {

        // To Check If User Already Excists*
        dbConnection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                userId = results[0].ID;
                response.redirect('index');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

// display notes page*
route.get('/index', function (req, res, next) {

    dbConnection.query('SELECT * FROM notes WHERE fk_user = ?', [userId], function (err, result) {

        if (err) {
            req.flash('error', err);
            // render to views/index.ejs
            res.render('index', {
                data: ''
            });
        } else {
            // render to views/index.ejs
            res.render('index', {
                data: result
            });
        }
    });
});
//Create note*
route.post('/index', function (request, response) {
    var noteText = request.body.notetext;
    console.log(noteText);
    console.log(request.session.username);
    dbConnection.query('INSERT INTO notes(text, fk_user) VALUES (?,?)', [noteText, userId], function (error, results, fields) {
        response.redirect('index');
        console.log("");
        response.end();
    });
});

// display note edit*
route.get('/edit/(:id)', function (req, res) {

    dbConnection.query('SELECT * FROM notes WHERE fk_user = ?', [userId], function (err, result, fields) {
        if (err) {
            req.flash('error', err);
            console.log(err);
            // render to views/index.ejs
            res.render('edit', {
                data: ''
            });
        } else {
            console.log("xd");
            res.render('edit', {
                data: result
            });

        }
    });
});

// update notes data*
route.post('/edit/:id', function (req, res, next) {

    var id = req.params.id;
    var text = req.body.notetext;

    // update query
    dbConnection.query('UPDATE notes SET text = ? WHERE ID = ?', [text, id], function (err, result) {
        //if(err) throw err
        if (err) {
            // render to edit.ejs
            res.render('/edit/:id');
        } else {
            res.redirect('../index');
        }
    });
});

// Delete note*
route.get('/delete/(:id)', function (req, res, next) {

    var ID = req.params.id;
    console.log(ID);

    dbConnection.query('DELETE FROM notes WHERE ID =' + ID, function (err, result) {
        //if(err) throw err
        if (err) {
            console.log(err);
        } else {
            res.redirect('../index');
        }
    });
});

module.exports = route;