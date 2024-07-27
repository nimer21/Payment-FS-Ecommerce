const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    // Check if user has permission to upload products
    //...
    const user = await userModel.findById(userId);
    if (user.role !== "ADMIN") {
        return false;
    }
    return true;
};

module.exports = uploadProductPermission;