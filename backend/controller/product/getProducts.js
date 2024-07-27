const productModel = require("../../models/productModel");

const getProductsController = async (req, res, next) => {
    try {
        // Fetch products from the database
        const allProducts = await productModel.find().sort({ createdAt : -1 });
        
        // Send the products as a response
        res.status(200).json({
            message: "Products retrieved successfully",
            data: allProducts,
            error: false,
            success: true,
        });
    } catch (error) {
        // Handle the error and send it as a response
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
module.exports = getProductsController