const Router = require('express');
const Product = require('../dao/models/modelProduct');
const ProductManager = require('../dao/fileSystem/productManager');

const router = Router();

router.get('/', async (req, res) => {
    let response = {};

    try {
        let { limit, page, sort, query } = req.query;

        if (limit === undefined) {
            limit = 10;
        }

        if (page === undefined) {
            page = 1;
        }

        let options = {
            page,
            limit
        };

        if (sort == "asc") {
            options.sort = { price: 1 };
        }
        else if (sort == "desc") {
            options.sort = { price: -1 };
        }

        let products = await Product.paginate({}, options);

        response.status = 'success';
        response.payload = products.docs;
        response.totalPages = products.totalPages;
        response.prevPage = products.prevPage;
        response.nextPage = products.nextPage;
        response.page = products.page;
        response.hasPrevPage = products.hasPrevPage;
        response.hasNextPage = products.hasNextPage;

        if (response.hasPrevPage == false) {
            response.prevLink = null;
        } else {
            response.prevLink = `api/products?page=${response.prevPage}`;
        }

        if (response.hasNextPage == false) {
            response.nextLink = null;
        } else {
            response.nextLink = `api/products?page=${response.nextPage}`;
        }

        res.send(response);
    } catch (error) {
        response.status = 'error';
        res.send(response);
    }
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
