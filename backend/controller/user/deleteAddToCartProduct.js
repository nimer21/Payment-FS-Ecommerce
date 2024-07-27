const addToCartModel = require("../../models/cartProductModel");

const deleteAddToCartProductController = async(req,res)=> {
    try {
        // Implement logic to delete product from cart
        //...
        // Simulating product deletion from cart
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id; //req.body.productId;
        const deletedProduct = await addToCartModel.deleteOne({_id:addToCartProductId}); //findByIdAndDelete
        res.json({
            message: 'Product deleted from Cart successfully',
            success: true,
            error: false,
            data: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || error, // 'Error deleting product from cart'
            success: false,
            error: true
        });
    }
};

module.exports = deleteAddToCartProductController;