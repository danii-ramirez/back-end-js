const fs = require('fs')

function writeFile(path, arrObj) {
    fs.writeFile(path, JSON.stringify(arrObj, null, 2), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

class ProductManager {
    constructor() {
        this.path = './products.json'
    }

    getProducts() {
        let products = []

        try {
            let file = fs.readFileSync(this.path, 'utf-8')
            products = JSON.parse(file)
        } catch (error) {
            console.log(error)
        }

        return products
    }

    getProductById(id) {
        let products = this.getProducts()
        let product = products.find(x => x.id == id)
        if (product == undefined) {
            return 'not found'
        } else {
            return product;
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title == null | description == null | price == null | thumbnail == null | code == null | stock == null) {
            console.log('no se puede crear el producto porque hay campos vacios')
        }
        else {
            let products = this.getProducts()

            if (products.find(x => x.code == code) != undefined) {
                console.log('no se puede duplicar el código')
            } else {
                let product = {
                    id: products.length + 1,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }

                products.push(product)
                writeFile(this.path, products)
            }
        }
    }

    updateProduct(id, price, stock) {
        if (price == null | stock == null) {
            console.log('no se puede actualizar el producto porque hay campos vacios')
        } else {
            let product = this.getProductById(id)
            product.price = price
            product.stock = stock

            let products = this.getProducts()
            let productIndex = products.findIndex(x => x.id == id)
            products[productIndex] = product

            writeFile(this.path, products)
        }
    }

    deleteProduct(id) {
        let products = this.getProducts()

        if (products.find(x => x.id == id) == undefined) {
            console.log('not found')
        } else {
            products = products.filter(x => x.id != id)
            writeFile(this.path, products)
        }
    }
}

let pm = new ProductManager();

console.log(pm.getProducts())

pm.addProduct('producto prueba', 'este es un producto de prueba', 200, 'sin imagen', 'abc123', 25)

console.log(pm.getProducts())

console.log(pm.getProductById(1))

pm.updateProduct(1, 500, 1000)

pm.deleteProduct(1)
