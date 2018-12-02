var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// schema for user
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hash: String,
    salt: String
});

// set a user's password
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// check to see if password is valid
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// generate a token for a user
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        isAdmin: this.isAdmin,
        exp: parseInt(expiry.getTime() / 1000),
    }, require('../config/database').secret);
};

mongoose.model('User', userSchema);