var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10,

    UserSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        name: String,
        age: Number,
        sex: Boolean,
        password: String,
        created: {
            type: Number,
            default: () => Date.now()
        }
    });

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }
    // generate a salt value

    bcrypt.genSalt(SALT_INDEX, (saltErr, salt) => {
        if (saltErr) {
            console.error(saltErr);
            return next(saltErr);
        }
        console.info('SALT GENERATED', salt);

        // hashing
        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error(hashErr);
                return next(hashErr);
            }

            // override PTP w/ HP
            user.password = hashedPassword;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
