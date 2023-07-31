const express = require('express');
const Product = require('../dao/models/modelProduct');
const Cart = require('../dao/models/modelCart');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('login')
})

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
})

router.get('/products', isAuthenticated, async (req, res) => {
    const json = await Product.find();
    const products = JSON.parse(JSON.stringify(json));

    res.render('products', { products, firstName: req.session.firstName });
});

router.get('/cart', async (req, res) => {
    const json = await Cart.findOne({ _id: '64beee5af2e2fa32f325032e' });
    const cart = JSON.parse(JSON.stringify(json));
    console.log(cart);
    res.render('cart', { cart });
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/perfil', isAuthenticated, (req, res) => {
    res.render('perfil', { firstName: req.session.firstName, rol: req.session.rol });
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send('Faild logout');
        }
        else {
            res.redirect('login');
        }
    })
})

function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('login');
    }
}

module.exports = router;
