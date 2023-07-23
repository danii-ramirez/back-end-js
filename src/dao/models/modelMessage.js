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

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
