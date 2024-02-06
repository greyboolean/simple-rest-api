const express = require("express");
const mongoose = require("mongoose");
// Load environment variables from .env file
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB:", error);
	});
