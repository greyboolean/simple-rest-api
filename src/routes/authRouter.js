const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router
	.post("/register", authController.register)
	.post("/login", authController.login)
	.post("/logout", authController.logout);

module.exports = router;
