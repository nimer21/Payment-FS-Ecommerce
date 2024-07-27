const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    // Check if the user exists
    console.log("userId",req.userId);
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).send("User not found");
    // Retrieve user details
    res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "User details retrieved successfully",
    })
    //console.log("user",user)
    
    // Check if the user has the required role
    /*if (user.role!== "admin") {
      return res.status(403).send("Forbidden. Only admin users can access this route.");
    }*/

  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userDetailsController;