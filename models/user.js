var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportlocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String

    },
    admin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

User.plugin(passportlocalMongoose);

module.exports = mongoose.model('User',User);