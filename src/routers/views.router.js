const express = require('express');
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

module.exports = router;
