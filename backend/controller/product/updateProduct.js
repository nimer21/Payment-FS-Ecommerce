const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req,res){
    try {
        if(!uploadProductPermission(req.userId)){
            throw new Error("permission denied edit for user ");
            // User not authorized to edit product
        }

        const { _id, ...resBody} = req.body;
        // Update the product document in the database
        const updatedProduct = await productModel.findByIdAndUpdate(_id,resBody);
        //const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        // Validate the product id
        /*if(!isValidObjectId(req.params.id)){
            throw new Error("Invalid product id");
        }*/

        // Get the product document from the database
       /* const product = await productModel.findById(req.params.id);
        if(!product){
            throw new Error("Product not found");
        }*/
        
        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct,
            success: true,
            error: false,
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            message: 'Error updating product',
            success: false,
            error: true,
            data: []
        });
    }  // End of try-catch block
}
module.exports = updateProductController;