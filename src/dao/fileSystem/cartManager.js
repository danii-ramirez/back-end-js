const fs = require('fs');

class CartManager {
    constructor() {
        this.path = __dirname + '/carrito.json';
    }

    async getCarts() {
        let file = await fs.promises.readFile(this.path, 'utf-8');
        let carts = JSON.parse(file);
        return carts;
    }

    async getCartById(id) {
        let file = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(file);
        let cart = carts.find(x => x.id == id);
        return cart;
    }

    async addCart(cart) {
        let carts = await this.getCarts();
        carts.push(cart);
        writeFile(this.path, carts);
    }

    async updateCart(cart) {
        const carts = await this.getCarts();
        let cartIndex = carts.findIndex(x => x.id == cart.id);
        carts[cartIndex] = cart;
        writeFile(this.path, carts);
    }
}

function writeFile(path, arrObj) {
    fs.writeFile(path, JSON.stringify(arrObj, null, 2), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = CartManager