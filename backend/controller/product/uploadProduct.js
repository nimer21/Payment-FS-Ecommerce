const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function uploadProductController(req,res){
    try {
        const sessionUserId = req.userId;
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("permission denied for user " + sessionUserId);
            // User not authorized to upload product
            /*return res.status(403).json({
                message: "You are not authorized to upload product",
                data: [],
                error: true,
                success: false,
            });*/
        }
        // Upload product to MongoDB using multer middleware
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();
        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct,
        });
        //...
    } catch (error) {
        console.error("Error uploading product", error);
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false,
        });
    }
}
module.exports = uploadProductController;