const Router = require('express');
const Cart = require('../dao/models/modelCart')
const CartManager = require('../dao/fileSystem/cartManager')

const router = Router();

router.post('/', async (req, res) => {
    const cart = await Cart.create({
        date: '06/06/2023'
    });

    res.send(cart);
});

router.get('/:pid', async (req, res) => {
    try {
        let id = req.params.pid;
        const cart = await Cart.findById(id);
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
            quantity: 2
        }
    )

    const newCart = await Cart.updateOne({ _id: cid }, cart)
    res.send(newCart);

    // const cartManager = new CartManager();

    // let cart = await cartManager.getCartById(cid);

    // if (cart === undefined) {
    //     res.send('cart not found')
    // } else {
    //     var prod = cart.products.find(x => x.product == pid)

    //     if (prod === undefined) {
    //         prod = {
    //             product: parseInt(pid),
    //             quantity: 1
    //         };

    //         cart.products.push(prod);
    //     } else {
    //         let prodIndex = cart.products.findIndex(x => x.product == pid);
    //         prod.quantity++;
    //         cart.products[prodIndex] = prod;
    //     }

    //     await cartManager.updateCart(cart);

    //     res.send(cart);
    // }
});

module.exports = router;
