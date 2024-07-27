const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function userSignUpController(req, res) {
  try {
    /*const user = await User.create(req.body);
        res.status(201).json(user);*/
    const { email, password, name } = req.body;
    //console.log("req.body", req.body);

    const user = await userModel.findOne({ email: email });
    if (user) {
      throw new Error("User already exists");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email address");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = await bcrypt.hashSync(password, salt);
    // Store hash in your password DB.
    if (!hashPassword) {
      throw new Error("Password hashing failed");
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
      //createdAt: new Date(),
      //updatedAt: new Date(),
    };
    //const user = await userModel.create(payload);
    //res.status(201).json(user);
    // Send email verification link.
    // sendVerificationEmail(user);
    // Send welcome email.
    // sendWelcomeEmail(user);
    // Send password reset link.
    // sendResetPasswordEmail(user);
    // Add user to mailing list.
    // addToMailingList(user);

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    if (!saveUser) {
      throw new Error("User not saved");
    }
    res.status(201).json({
      message: "User created successfully",
      success: true,
      error: false,
      data: saveUser,
    });
  } catch (error) {
    //res.status(400).json({ error: error.message });
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignUpController;
