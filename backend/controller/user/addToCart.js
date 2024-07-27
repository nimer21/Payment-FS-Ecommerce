const addToCartModel = require ('../../models/cartProductModel');

const addToCartController = async(req,res)=>{
    try {
        const { productId } = req?.body;
        const currentUser = req.userId; // => middleware / authToken.js

        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser});

        if(isProductAvailable) {
            return res.json({ 
                message: "Product already exists in the cart",
                error: true,
                success: false,
             });
        }

        const payload = {
            userId: currentUser,
            productId: productId,
            quantity: 1, // Default quantity
            //...
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();
        return res.status(201).json({
            message: "Product added to cart",
            data: saveProduct,
            error: false,
            success: true,
        });
        // Add product to the user's cart
        //...
        // Simulating adding product to the cart
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false,
        });
    }
};
module.exports = addToCartController;