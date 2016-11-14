var Auth = require('./controllers/auth')
express = require('express');

module.exports = (app) => {

    app.get('/logout', Auth.logout);
    app.post('/login', Auth.login);
    app.post('/register', Auth.register);
    app.get('/', Auth.middlewares.session);

    app.all('/api*', Auth.middlewares.session);

    app.use(express.static('public'));
}
