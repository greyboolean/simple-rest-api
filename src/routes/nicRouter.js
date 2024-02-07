const express = require("express");
const nicController = require("../controllers/nicController");
const authController = require("../controllers/authController");

const router = express.Router();

// Define routes for the root path '/'
router.route("/").post(authController.protect, nicController.convertNic);

module.exports = router;
