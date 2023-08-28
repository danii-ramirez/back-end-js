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
    age: {
        type: Number
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    role: {
        type: String,
        default: 'user'
    },
    idGitHub: {
        type: String
    }
});

UserScheme.pre('findOne', function () {
    this.populate("cart");
})

const User = mongoose.model('User', UserScheme);
module.exports = User;
