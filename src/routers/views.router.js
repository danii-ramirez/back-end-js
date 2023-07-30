const express = require('express');
const Product = require('../dao/models/modelProduct')
const Cart = require('../dao/models/modelCart')
const ProductManager = require('../dao/fileSystem/productManager');

const router = express.Router();

router.get('/', async (req, res) => {
    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    res.render('home', { products });
})

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
})

router.get('/products', async (req, res) => {
    const json = await Product.find()
    const products = JSON.parse(JSON.stringify(json));
    res.render('products', { products });
});

router.get('/cart', async (req, res) => {
    const json = await Cart.findOne({ _id: '64beee5af2e2fa32f325032e' });
    const cart = JSON.parse(JSON.stringify(json));
    console.log(cart);
    res.render('cart', { cart });
})

module.exports = router;
