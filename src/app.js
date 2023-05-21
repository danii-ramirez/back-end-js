const express = require('express')
const ProductManager = require('./productManager')

const app = express()

app.get('/products', async (req, res) => {
    let { limit } = req.query

    const productManager = new ProductManager()
    let products = await productManager.getProducts()

    if (limit !== undefined) {
        products = products.splice(0, limit)
    }

    res.send({ products: products })
})

app.get('/product/:id', async (req, res) => {
    let idProduct = req.params.id

    const productManager = new ProductManager()
    let product = await productManager.getProductById(idProduct)
    res.send(product)
})

app.listen(8080, () => {
    console.log('server runnig port 8080')
})
