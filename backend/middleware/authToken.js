const jwt = require("jsonwebtoken");
async function authToken(req, res, next) {
  try {
    //const token = req.cookies?.headers.authorization?.split(' ')[1];
    //const token = req.cookies?.token || req.header;
    const token = req.cookies?.token;
    //console.log("token", token);
    if (!token) {
      //throw new Error("Missing token");
      return res.status(200).json({
        message: "Missing token, Please Login...! ",
        data: [],
        error: true,
        success: false,
      });
    }

    // verify a token symmetric
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      //console.log(err);
      //console.log("decoded", decoded); // bar

      // if token is not valid, send 403 Forbidden response
      if (err) {
        //throw new Error("Invalid token");
        return res.status(403).json({
          message: "Forbidden response, Missing token",
          data: [],
          error: true,
          success: false,
        });
      }
      
      // if token is valid, add user id to request object
      req.userId = decoded?._id;
      next();
      // res.json({ message: "Token is valid" });
      //res.json({ message: "Token is valid", user: decodedToken });
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}
module.exports = authToken;
