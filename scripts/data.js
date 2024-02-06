const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const user = require("../src/models/userModel");
const User = require("../src/models/userModel");
require("dotenv").config();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Errro connecting to MongoDB:", error);
	});

const generateUsers = async (num) => {
	for (let i = 0; i < num; i++) {
		const user = new User({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			password: "pass1234",
			role: faker.helpers.arrayElement(["admin", "user"]),
		});
		await user.save();
	}
};

// Generate data
const generateData = async (num) => {
	try {
		await generateUsers(num);
		console.log("Data generation completed");
	} catch (error) {
		console.error("Error generating data:", error);
	}
	try {
		await mongoose.connection.close();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.error("Error disconnecting from MongoDB:", error);
	}
};

// Delete data
const deleteData = async () => {
	try {
		await User.deleteMany();
		console.log("Data deletion completed");
	} catch (error) {
		console.error("Error deleting data:", error);
	}
	try {
		await mongoose.connection.close();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.log("Error disconnecting from MongoDB:", error);
	}
};

// Check command line arguments
const command = process.argv[2];
const num = process.argv[3] || 5;

if (command === "generate") {
	generateData(num);
} else if (command === "delete") {
	deleteData();
} else {
	console.log('Invalid command. Use "generate" or "delete"');
}
