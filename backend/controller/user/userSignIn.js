const bcrypt = require("bcrypt");
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');
async function userSignInController(req, res) {
  try {
    [];
    const { email, password } = req.body;

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email address");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const checkPassword = await bcrypt.compare(password,user.password);
    //console.log("Checking password", checkPassword);
    if (checkPassword) {
        // Create and assign JWT token to user upon successful login.
        const tokenData = {
            _id: user._id,
            email: user.email,
            //name: user.name,
            //role: user.role,
            // Add more fields as per your requirements.
            // For example, if you want to include user profile picture, add "profilePicture" field in the tokenData.
        };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });
    const tokenOption = {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: true
    }
    res.cookie("token",token,tokenOption).status(200).json({
      message: "User signed in successfully",
      success: true,
      error: false,
      data: { token },
    });
      
    } else {
        throw new Error("Incorrect password");
    }

    


    // Load hash from your password DB.
    //bcrypt.compareSync(myPlaintextPassword, hash); // true
    //bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
