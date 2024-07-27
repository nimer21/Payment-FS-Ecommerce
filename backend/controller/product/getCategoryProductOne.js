const productModel = require("../../models/productModel");


const getCategoryProductController = async(req,res) =>{
    //return product.filter(p => p.category === 'categoryName')
    try{
        //const productCategor = req.params.category;
        const productCategory = await productModel.distinct("category");
        //array to store one product from each category
        const productByCategory = [];
        for(const category of productCategory){ //.split(",")
            const product = await productModel.findOne({category: category});
            //if(!product) continue; //if product not found, skip it
            //add product to the array
            //productByCategory.push(product);
            //or using map
            //productByCategory.push({category, product});
            //or using map and destructuring
            //const {name, price, image, _id} = product;
            //const productObj = {category, name, price, image, productId: _id};
            //productByCategory.push(productObj
            if(product){
                productByCategory.push(product);
            }

        }
        res.status(200).json({
            message: "Products Category fetched successfully",
            error: false,
            success: true,
            data: productByCategory
        });
    } catch(err){
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}
module.exports = getCategoryProductController;