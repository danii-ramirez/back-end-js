const fs = require('fs')

class ProductManager {
    constructor() {
        this.products = []
        this.path = './products.json'
    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title == null | description == null | price == null | thumbnail == null | code == null | stock == null) {
            console.log('no se puede crear el producto porque hay campos vacios')
        }
        else if (this.products.find(x => x.code == code) != undefined) {
            console.log('no se puede duplicar el código')
        } else {
            let product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: this.products.length + 1
            }

            this.products.push(product)
        }
    }

    getProductById(id) {
        let product = this.products.find(x => x.id == id)
        if (product == undefined) {
            return 'not found'
        } else {
            return product;
        }
    }
}

let productManager = new ProductManager();
