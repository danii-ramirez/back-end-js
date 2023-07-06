const mongoose = require('mongoose')

const URL = 'mongodb+srv://ramirezdani:boVzim-2kucci-syhquk@cluster0.b4ozarf.mongodb.net/e-commerce'

module.exports = {
    connect: async () => {
        try {
            const cnn = await mongoose.connect(URL, {})
            console.log('connected to db')
        } catch (err) {
            return console.log(err)
        }
    }
}
