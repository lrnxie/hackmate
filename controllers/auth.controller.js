const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Get user by token
// @route   GET /api/auth
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth
// @access  Private
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: ["Both email and password are required"] });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: ["User not exists"] });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: ["Incorrect password"] });
    }

    jwt.sign(
      { userId: user.id },
      process.env.JWT_KEY,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({ msg: "Log in success", token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};
