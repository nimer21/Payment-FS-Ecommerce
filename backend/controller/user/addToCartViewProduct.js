const addToCartModel = require('../../models/cartProductModel');
const addToCartViewProductController = async (req,res) => {
    try {
        // Retrieve product from the database
        const currentUser = req.userId;
        const allProduct = await addToCartModel.find({
            userId: currentUser
        }).populate("productId") // key to populate
        res.status(200).json({
            data: allProduct,
            success: true,
            error: false
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartViewProductController;