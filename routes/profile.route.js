const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

router
  .route("/:userId")
  .get(getProfile)
  .post(auth, updateProfile)
  .delete(auth, deleteProfile);

module.exports = router;
