const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");
const {
  initProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

router.route("/").get(getUsers).post(addUser, initProfile);

router
  .route("/:userId")
  .delete(auth, deleteUser, deleteProfile)
  .put(auth, updateUser);

module.exports = router;
