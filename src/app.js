const express = require('express');
const handlebars = require('express-handlebars');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');
const viewsRouter = require('./routers/views.router');
const { Server } = require('socket.io');
const ProductManager = require('./dao/fileSystem/productManager');
const CONFIG = require('./config/config')
const database = require('./dao/db.js');

const app = express();

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);

const httpServer = app.listen(CONFIG.PORT, () => {
    console.log(`server runnig port ${CONFIG.PORT}`);
    database.connect();
});

const productManager = new ProductManager();
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('cliente conectado');

    socket.on('message', (data) => {
        console.log(data)
    })

    let products = await productManager.getProducts();
    socket.emit('data', products);
});
