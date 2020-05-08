const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUser, loginUser } = require("../controllers/auth.controller");

router.route("/").get(auth, getUser).post(loginUser);

module.exports = router;
