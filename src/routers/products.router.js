const Router = require('express');
const ProductManager = require('../productManager');

const router = Router();

router.get('/', async (req, res) => {
    let { limit } = req.query;

    const productManager = new ProductManager();
    let products = await productManager.getProducts();

    if (limit !== undefined) {
        products = products.splice(0, limit);
    }

    res.send(products);
});

router.get('/:pid', async (req, res) => {
    let idProduct = req.params.pid;

    const productManager = new ProductManager();
    let prod = await productManager.getProductById(idProduct);

    if (prod === undefined) {
        res.send('product not found');
    } else {
        res.send(prod);
    }
});

router.post('/', async (req, res) => {
    let product = {
        ...req.body
    };

    if (product.title == null) {
        res.send('the title is required');
    } else if (product.description == null) {
        res.send('the description is required');
    } else if (product.code == null) {
        res.send('the code is requerid');
    } else if (product.price == null) {
        res.send('the product is requerid');
    } else if (product.stock == null) {
        res.send('the stock is requerid');
    } else {
        if (product.status == null) {
            product.status = true;
        }

        const productManager = new ProductManager();

        let products = await productManager.getProducts();

        product.id = products.length + 1;

        await productManager.addProduct(product)

        res.send(product);
    }
});

router.put('/:pid', async (req, res) => {
    let idProduct = req.params.pid;
    let product = req.body;

    if (product.title == null) {
        res.send('the title is required');
    } else if (product.description == null) {
        res.send('the description is required');
    } else if (product.code == null) {
        res.send('the code is requerid');
    } else if (product.price == null) {
        res.send('the product is requerid');
    } else if (product.stock == null) {
        res.send('the stock is requerid');
    } else {
        if (product.status == null) {
            product.status = true;
        }

        const productManager = new ProductManager();

        if (await productManager.getProductById(idProduct) === undefined) {
            res.send('product not found');
        } else {
            product.id = idProduct;
            await productManager.updateProduct(product);
            res.send(product);
        }
    }
});

router.delete('/:pid', async (req, res) => {
    let idProduct = req.params.pid;

    const productManager = new ProductManager();

    if (await productManager.getProductById(idProduct) === undefined) {
        res.send('product not found');
    } else {
        await productManager.deleteProduct(idProduct);
        res.send('deleted product');
    }
});

module.exports = router;