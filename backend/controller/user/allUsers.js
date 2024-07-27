const userModel = require("../../models/userModel");
async function allUsersController(req, res) {
    try {
        //const response = await axios.get('/api/users');
        //console.log("userid all users", req.userId);

        const allUsers = await userModel.find();
        
        res.status(200).json({
            data: allUsers,
            error: false,
            success: true,
            message: "All Users retrieved successfully",
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}
module.exports = allUsersController;