const Profile = require("../models/Profile");

// @desc    Get profile by user ID
// @route   GET /api/profile/:userId
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", "name");

    if (!profile) {
      return res.status(404).json({ error: ["Profile not found"] });
    }

    return res.json(profile);
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

// @desc    Create or update user own profile
// @route   POST /api/profile/:userId
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    // Only allow user to update own profile
    const authUserId = req.userId;
    if (req.params.userId !== authUserId) {
      return res.status(401).json({ error: ["Authorization denied"] });
    }

    const { headline, location, bio, skills } = req.body;

    const newProfile = {
      user: authUserId,
      headline,
      location,
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills
            .split(",")
            .filter((skill) => skill !== "")
            .map((skill) => skill.trim()),
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: authUserId },
      { $set: newProfile },
      { new: true, upsert: true, runValidators: true }
    ).populate("user", "name");

    return res
      .status(200)
      .json({ msg: "Profile updated", profile: updatedProfile });
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

// @desc    Delete user own profile
// @route   DELETE /api/profile/:userId
// @access  Private
exports.deleteProfile = async (req, res) => {
  try {
    // Only allow user to update own profile
    const authUserId = req.userId;
    if (req.params.userId !== authUserId) {
      return res.status(401).json({ error: ["Authorization denied"] });
    }

    const profile = await Profile.findOne({ user: authUserId });

    if (!profile) {
      return res.status(404).json({ error: ["Profile not found"] });
    }

    await profile.remove();

    return res.status(200).json({ msg: "Profile deleted" });
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
