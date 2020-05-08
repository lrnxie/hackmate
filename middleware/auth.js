const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "Authorization required" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token is not valid" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};
