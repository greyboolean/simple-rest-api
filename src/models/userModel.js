const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		validate: [validator.isEmail],
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
