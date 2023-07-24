const Router = require('express');
const Cart = require('../dao/models/modelCart')

const router = Router();

router.post('/', async (req, res) => {
    const cart = await Cart.create({
        date: new Date().toLocaleDateString()
    });

    res.send(cart);
});

router.get('/:cid', async (req, res) => {
    try {
        let id = req.params.cid;
        const cart = await Cart.findOne({ _id: id });
        res.send(cart);
    } catch (error) {
        res.send('cart not found');
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    const cart = await Cart.findOne({ _id: cid })
    cart.products.push(
        {
            product: pid,
            quantity: 0
        }
    )

    const newCart = await Cart.updateOne({ _id: cid }, cart)
    res.send(newCart);
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;

        const cart = await Cart.findById(cid);
        cart.products = cart.products.filter(x => x.product._id != pid)
        await cart.updateOne(cart)
        res.send(cart);
    } catch (error) {
        res.send(error)
    }
});

router.put('/:cid', async (req, res) => {
    try {
        let cid = req.params.cid;
        let product = {
            ...req.body
        };

        const cart = await Cart.findById(cid);
        cart.products.push({ product: product.id })
        await cart.updateOne(cart)
        res.send('Ok')
    } catch (error) {
        res.send(error)
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let product = {
            ...req.body
        };

        const cart = await Cart.findById(cid);
        cart.products.find(x => x.product._id == pid).quantity = product.quantity;
        await cart.updateOne(cart);
        res.send(cart);
    } catch (error) {
        res.send(error);
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        let cid = req.params.cid;
        const cart = await Cart.findById(cid);
        cart.products = [];
        await cart.updateOne(cart);
        res.send('Ok');
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
