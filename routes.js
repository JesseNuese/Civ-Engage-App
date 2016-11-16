var Auth = require('./controllers/auth'),
    express = require('express');

module.exports = (app) => {

    app.get('/', Auth.middlewares.session); // middlewares

    app.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: './views/html'
        })
    });

    app.use('/api*', Auth.middlewares.session);

    app.get('/logout', Auth.logout);
    app.post('/login', Auth.login);
    app.post('/register', Auth.register);


    // app.all('/api*', Auth.middlewares.session);
    //
    // app.use(express.static('public'));
}
