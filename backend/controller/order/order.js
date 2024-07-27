const orderModel = require("../../models/orderProductModel");

const orderController = async(request, response)=>{
    try {
        const currentUserId = request.userId;
        const orderList = await orderModel.find({ userId: currentUserId }).sort({ createdAt: -1 });
        //const order = await Order.findByIdAndUpdate(request.params.id, request.body, {new: true}).populate('user');

        response.json({
            success: true,
            data: orderList,
            message: "Order list fetched successfully"
        });
    } catch (error) {
        response.status(500).json({
            error: true,
            message: error.message || error
        });
    }    
}
module.exports = orderController;