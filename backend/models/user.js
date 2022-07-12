const mongose = require('mongoose');
const config = require('../config/db');
const crypt = require('bcryptjs');
const mongoose = require("mongoose");

const UserSchema = mongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = function (login, callback) {
    const query = {login: login};
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.addUser = function (newUser, callback) {
    crypt.genSalt(6, (err, salt) => {
        crypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

module.exports.comparePassw = function(passwFromUser, passwFromDB, callBack) {
    crypt.compare(passwFromUser, passwFromDB, (err, isMatch) => {
        if (err) throw err;
        callBack(null, isMatch);
    });
}