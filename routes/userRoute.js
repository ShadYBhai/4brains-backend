const express = require("express");
const router = express.Router();

const { createUser, authUser } = require("../controllers/userController");

router.route("/user/register").post(createUser);

router.route("/user/login").post(authUser);

module.exports = router;
