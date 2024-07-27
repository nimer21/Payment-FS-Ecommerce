const userModel = require("../../models/userModel");

async function updateUserController(req,res){
    try {
        // Check if the user exists
        const sessionUser = req.userId;
        //const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const { userId, email, name, role} = req.body;
        const payload = {
            //...( email && { email: email, name: name, role: role})
            ...( email && { email: email}),
            ...( name && { name: name}),
            ...(role && { role: role}),
        }
        const user = await userModel.findById(sessionUser);
        console.log("user.role", user.role);

        const updateUser = await userModel.findByIdAndUpdate(userId, payload);
        res.status(200).json({
            message: "User updated successfully",
            data: updateUser,
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(400).json({message: err.message, data: [], error: true, success: false});
    }
}
module.exports = updateUserController