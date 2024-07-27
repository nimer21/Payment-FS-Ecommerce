async function userLogoutController(req, res, next) {
    try {
        const tokenOption = {
            expires: new Date(Date.now() + 3600000), // 1 hour
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        res.clearCookie("token",tokenOption);   // clear cookies

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