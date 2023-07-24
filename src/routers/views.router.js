const express = require('express');
const Product = require('../dao/models/modelProduct')
const ProductManager = require('../dao/fileSystem/productManager');

const router = express.Router();

router.get('/', async (req, res) => {
    let productManager = new ProductManager();
    let products = await productManager.getProducts();

    res.render('home', { products });
})

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
})

router.get('/products', async (req, res) => {
    let products = await Product.find()

    console.log(products)

    res.render('products', { products });
});

module.exports = router;
