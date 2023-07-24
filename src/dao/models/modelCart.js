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
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

CartSchema.pre('findOne', function () {
  this.populate("products.product");
})

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
