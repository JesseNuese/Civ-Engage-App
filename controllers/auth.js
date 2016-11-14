var User = require('../models/user'),
    bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => { //POST login
        console.info('LOGIN::POST::PAYLOAD::', req.body);

        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                console.error('MongoDB error: ',
                    err);
                res.status(500).json(err);
            }
            if (!user) {
                console.warn('No user found!');
                res.status(403).json({
                    message: 'Invalid username or password'
                });
            } else {
                console.info('auth.login', user);

                bcrypt.compare(req.body.password, user.password, (compareErr, matched) => {
                    if (compareErr) {
                        console.error('compareErr error:', compareErr);
                        res.status(500).json(err);
                    } else if (!matched) {
                        console.warn('Password mismatch!');
                        res.status(403).json({
                            message: 'Invalid username or password'
                        });
                    } else {
                        req.session.userID = user._id;
                        res.send({
                            message: 'Login success!'
                        });
                    }
                })
            }
        })
    },
    logout: (req, res) => {
        req.session.reset();
        res.redirect('/html/login.html');
    },
    register: (req, res) => {
        req.session.reset();
        res.redirect('/html/login.html');
    },
    register: (req, res) => {
        console.log(req.body);

        var newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                return res.send(err);
            }
            res.send(user);
        });
    },
    middlewares: {
        session: (req, res, next) => { //checks for loggedin user
            if (req.session.userId) {
                next();
            } else {
                res.redirect('/html/login.html');
                console.log("Test #1")
            }
        }
    }
}
