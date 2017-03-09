const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('connceted to database: ' + config.database);
})

mongoose.connection.on('error', function (err) {
    console.log('database error: ' + err);
})

const app = express();

const port = process.env.PORT || 8080;

const users = require('./routes/users');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users)

app.get('/', function (req, res) {
    res.send('hello world');
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, function () {
    console.log('server running on port ' + port);
})