var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Routes = require('./routes'),
    sessions = require('client-sessions')({
        cookieName: "civ-session",
        secret: 'dr@gons',
        requestKey: 'session',
        duration: (86400 * 1000) * 7,
        cookie: {
            ephemeral: false,
            httpOnly: true,
            secure: false
        }
    });

PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/civility', (err) => {
    if (err) {
        console.log('Error: ', err);
    } else {
        console.log('Successfully connected to database!');
    }
});

var app = express();

// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}), bodyParser.json());
app.use(sessions);

// Routes
Routes(app);

app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});
