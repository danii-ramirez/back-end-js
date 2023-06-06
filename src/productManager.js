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

    async addProduct(product) {
        let products = await this.getProducts()
        products.push(product)
        writeFile(this.path, products)
    }

    async updateProduct(product) {
        let products = await this.getProducts()
        let productIndex = products.findIndex(x => x.id == product.id)
        products[productIndex] = product
        writeFile(this.path, products)
    }

    async deleteProduct(id) {
        let products = await this.getProducts()
        products = products.filter(x => x.id != id)
        writeFile(this.path, products)
    }
}

function writeFile(path, arrObj) {
    fs.writeFile(path, JSON.stringify(arrObj, null, 2), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = ProductManager