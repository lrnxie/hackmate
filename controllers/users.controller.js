const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      count: users.length,
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
exports.addUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email already used
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: ["This email is used by another account"] });
    }

    // Check if password has 6 or more characters
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: ["Password must have 6 or more characters"] });
    }

    const newUser = new User(req.body);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    // Get token from jwt
    jwt.sign(
      { userId: newUser.id },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ msg: "New user sign up success", token });
      }
    );

    res.locals.userId = newUser.id;

    next();
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMsg = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        error: errMsg,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:userId
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    // Only allow user to delete his own account
    const authUserId = req.userId;
    if (req.params.userId !== authUserId) {
      return res.status(401).json({ error: ["Authorization denied"] });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: ["User not found"] });
    }

    await user.remove();

    res.locals.userId = authUserId;

    next();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: ["Invalid user ID"] });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Update user name and/or password
// @route   PUT /api/users/:userId
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    // Only allow user to update his own info
    const authUserId = req.userId;
    if (req.params.userId !== authUserId) {
      return res.status(401).json({ error: ["Authorization denied"] });
    }

    const { name, password } = req.body;
    let updatedInfo;

    if (password) {
      // User attempt to update name & password or password only
      if (name) {
        updatedInfo = { name, password };
      } else {
        updatedInfo = { password };
      }
      // Encrypt password if length 6 or more
      if (password.length > 6) {
        const salt = await bcrypt.genSalt(10);
        updatedInfo.password = await bcrypt.hash(password, salt);
      } else {
        return res
          .status(400)
          .json({ error: ["Password must have 6 or more characters"] });
      }
    } else if (name) {
      updatedInfo = { name };
    } else {
      return res.status(400).json({ error: ["No info to update"] });
    }

    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: updatedInfo },
      { new: true, fields: "-password", runValidators: true },
      (err, updatedUser) => {
        if (err) {
          if (err.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID" });
          } else if (err.name === "ValidationError") {
            const errMsg = Object.values(err.errors).map((val) => val.message);
            return res.status(400).json({
              error: errMsg,
            });
          }
        }

        if (!updatedUser) {
          return res.status(404).json({ error: ["User not found"] });
        } else {
          return res
            .status(200)
            .json({ msg: "User info updated", user: updatedUser });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};
