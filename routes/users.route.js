const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");

router.route("/").get(getUsers).post(addUser);

router.route("/:userId").delete(deleteUser).put(updateUser);

module.exports = router;
