const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    idGitHub: {
        type: String
    }
});

const User = mongoose.model('User', UserScheme);
module.exports = User;
