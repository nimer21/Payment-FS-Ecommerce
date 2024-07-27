const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
    productId: {
        ref: 'Product',
        type: String,
    },
    quantity: {
        type: Number,
    },
    userId: {
        type: String,
    },
},{
    timestamps: true
})

const addToCartModel = mongoose.model('addToCart', addToCartSchema);
module.exports = addToCartModel;