const mongoose = require('mongoose')
const CONFIG = require('../config/config')

const Product = require('./models/modelProduct')

module.exports = {
    connect: async () => {
        try {
            const cnn = await mongoose.connect(CONFIG.DB, { useUnifiedTopology: true, useNewUrlParser: true })
            console.log('connected to db')
        } catch (err) {
            return console.log(err)
        }
    }
}
