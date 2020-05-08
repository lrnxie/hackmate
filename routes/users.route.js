const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");

router.route("/").get(getUsers).post(addUser);

router.route("/:userId").delete(auth, deleteUser).put(auth, updateUser);

module.exports = router;
