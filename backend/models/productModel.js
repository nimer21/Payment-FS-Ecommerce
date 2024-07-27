const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        //unique: true
    },
    brandName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: [], 
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
},{
    timestamps: true
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;