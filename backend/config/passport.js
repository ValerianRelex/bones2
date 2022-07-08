const User = require('../models/user');
const config = require('./db');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// стратегия авторизации, выбрана с сайта самой библиотеки - https://www.passportjs.org/packages/passport-jwt/
// и настроена под свой проект.
module.exports = function(passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}