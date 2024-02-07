const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Define routes for the root path '/'
router.route("/").get(userController.getUsers).post(userController.createUser);

// Define routes for the path with User ID '/:id'
router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
