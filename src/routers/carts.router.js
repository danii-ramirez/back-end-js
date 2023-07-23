const Router = require('express');
const CartManager = require('../dao/cartManager')

const router = Router();

router.post('/', async (req, res) => {
    const cartManager = new CartManager();
    const carts = await cartManager.getCarts();

    let cart = {
        id: carts.length + 1,
        products: []
    };

    await cartManager.addCart(cart)

    res.send(cart);
});

router.get('/:pid', async (req, res) => {
    let id = req.params.pid;

    const cartManager = new CartManager();
    let cart = await cartManager.getCartById(id);

    if (cart === undefined) {
        res.send('cart not found');
    } else {
        res.send(cart);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    const cartManager = new CartManager();

    let cart = await cartManager.getCartById(cid);

    if (cart === undefined) {
        res.send('cart not found')
    } else {
        var prod = cart.products.find(x => x.product == pid)

        if (prod === undefined) {
            prod = {
                product: parseInt(pid),
                quantity: 1
            };

            cart.products.push(prod);
        } else {
            let prodIndex = cart.products.findIndex(x => x.product == pid);
            prod.quantity++;
            cart.products[prodIndex] = prod;
        }

        await cartManager.updateCart(cart);

        res.send(cart);
    }
});

module.exports = router;
