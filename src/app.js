const express = require('express');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

const PORT = 8080;
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`server runnig port ${PORT}`);
});
