const fs = require('fs')

class ProductManager {
    constructor() {
        this.path = __dirname + '/products.json'
    }

    async getProducts() {
        try {
            let file = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(file)
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(file)
            let product = products.find(x => x.id == id)
            return product
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductManager