const productModel = require("../../models/productModel");
const searchProductController =  async(req,res) => {
    try {
        const query  = req.query.q;
       // const products = await productModel.find({ $text: { $search: query } });
       const regex = new RegExp(query,'i','g');
       const product = await productModel.find({ 
        "$or": [
            { productName: regex },
            { category: regex }
        ]
        });
        res.status(200).json({
            message: "Search successful",
            data: product,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true,
        });
    }
};

module.exports = searchProductController;