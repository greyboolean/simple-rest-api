const mongoose = require("mongoose");
const validator = require("validator");
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

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
