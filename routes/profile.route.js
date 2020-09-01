const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  initProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

router
  .route("/:userId")
  .get(getProfile)
  .post(auth, initProfile)
  .put(auth, updateProfile)
  .delete(auth, deleteProfile);

module.exports = router;
