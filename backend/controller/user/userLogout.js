async function userLogoutController(req, res, next) {
    try {
        res.clearCookie("token");   // clear cookies

        //req.session.destroy();  // destroy session
        //req.logout();

        res.status(200).json({ 
            message: 'User logged out successfully',
            error: false,
            success: true,
            data: []
        });
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = userLogoutController;