const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrdersController = async(request,response) => {
    //...
    // Fetch all orders for the current user
    //...
    const userId = request.userId;
    const user = await userModel.findById(userId);
    if(user.role !== 'ADMIN') {
        return response.status(500).json({
            success: false,
            message: "Only admin users can access this endpoint"
        });
    }
    const allOrders = await orderModel.find().sort({ createdAt : -1 });
    return response.status(200).json({
        success: true,
        data: allOrders,
        message: "All orders fetched successfully"
    });
};
module.exports = allOrdersController;