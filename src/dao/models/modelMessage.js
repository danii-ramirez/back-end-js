const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true
    },
    message: {
        type: String
    }
})

const message = mongoose.model('Message', messageSchema)
module.exports = message
