const addToCartModel = require("../../models/cartProductModel");
const updateAddToCartProductController = async(req,res)=> {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        const qty = req.body.quantity;

        const updateProduct = await addToCartModel.updateOne({_id:addToCartProductId}, { //// Filter
            ...(qty && {quantity: qty}) //// Update
        });

        //await updateProduct.save(); // unnecessary 2nd call here
        console.log(updateProduct);
        /*{
            acknowledged: true,
            modifiedCount: 0,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 0
          }*/
        console.log(req.userId); // 668f1a583797263a32bcf0a1
        console.log(req.body.quantity); // 5
        console.log(req.body._id); //undefined
        console.log(req.body.productId); // 6693d2567eca9526028ba15a

        res.json({
            message: 'Product quantity updated successfully',
            data: updateProduct,
            success: true,
            Nimer: req.body._id,
            error: false,
            updatedQuantity: qty,
            currentUserId,
            addToCartProductId,
            // Add more details if needed. For example, the updated product details.
        })

        //const { productId, quantity } = req.body;
        // Implement logic to update the quantity of the product in the cart
        //...
        // Simulating updating product quantity in the cart
    } catch (error) {
        console.error('Error updating product quantity in cart:', error);
        res.status(500).json({
            message: error?.message || error,
            success: false,
            error: true,
            data: []
        });
    }
};
module.exports = updateAddToCartProductController;