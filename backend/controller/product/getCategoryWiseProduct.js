const productModel = require("../../models/productModel");

const getCategoryWiseProductController = async(req,res)=> {
    try {
        const { category } = req?.body || req.query;
        const product = await productModel.find({ category });
        res.json({
            data: product,
            message: 'getCategoryWiseProductController => Product: ',
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: 'getCategoryWiseProductController => Product:'+err.message || err,
            success: false,
            error: true,
        });
    }
};
module.exports = getCategoryWiseProductController;