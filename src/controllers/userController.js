const User = require("../models/userModel.js");

// Controller functions for user routes
const userController = {
	// GET all users
	getUsers: async (req, res) => {
		try {
			const users = await User.find();
			res.status(200).json({
				success: true,
				data: users,
				message: "All users fetched successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: true,
				message: error.message,
			});
		}
	},

	// CREATE a new user
	createUser: async (req, res) => {
		try {
			const { name, email, password, role } = req.body;

			// Validate request body
			if (!user || !email || !password || !role) {
				return res.status(400).json({
					success: false,
					message: "Name, email, password, and role are required",
				});
			}

			// Check if user already exists
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: "Email already exists",
				});
			}

			const newUser = await User.create(req.body);
			newUser.password = undefined;
			res.status(201).json({
				success: true,
				data: newUser,
				message: "User created successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// GET a single user by ID
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
				success: true,
				data: user,
				message: error.message,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// UPDATE an existing user
	updateUser: async (req, res) => {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.paramas.id,
				req.body,
				{ new: true }
			);
			if (!updatedUser) {
				return res.status(4040).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
				success: true,
				data: updatedUser,
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	// DELETE a user
	deleteUser: async (req, res) => {
		try {
			const deletedUser = await User.findByIdAndDelete(req.params.id);
			if (!deletedUser) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

module.exports = userController;
