const addToCartModel = require("../../models/cartProductModel");

const countAddToCartProductController = async(req,res) => {
    try {
        const userId = req.userId;

        const count = await addToCartModel.countDocuments({
            userId : userId,
        });
        res.status(200).json({
            message: 'Cart count retrieved successfully',
            data: {
                count : count
            },
            success: true,
            error: false,
        });
        // Implement logic to update product quantity in cart
        //...
        // Simulating updating product quantity in cart
        //...
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || error, //'Error updating product quantity in cart',
            success: false,
            error: true
        });
    }
}
module.exports = countAddToCartProductController