const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ]
  }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
