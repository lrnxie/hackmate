const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");

router.route("/:userId").get(getProfile).put(auth, updateProfile);

module.exports = router;
