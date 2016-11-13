var express = require('express'),
    morgan = require('morgan'),
    bodyParser = requre('body-parser'),
    mongoose = require('mongoose');

var app = express();
// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));



app.listen(3000, () => {
    console.log('Server is running')
});
