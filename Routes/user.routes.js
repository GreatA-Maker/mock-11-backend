const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// user model
const { userModel, UserModel } = require("../Model/user.model");

//controllers

const userController = express.Router();

userController.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	const userPresent = await UserModel.findOne({ email });

	if (userPresent) {
		return res.send("User Already Exists, Please Login");
	}

	bcrypt.hash(password, 5, async (error, hash) => {
		if (error) {
			return res.send("Something went wrong");
		}
		const user = new UserModel({
			email,
			password: hash,
		});
		try {
			await user.save();
			return res.send("Sign-Up successfully");
		} catch (err) {
			return res.send("Sign-Up Failed, Something went Wrong");
		}
	});
});

userController.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });

	const hash = user ? user.password : undefined;
	bcrypt.compare(password, hash, (error, result) => {
		if (error) {
			return res.send("Please Sign Up First");
		}
		if (result) {
			const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

			return res.send({ message: "Login Successful", token: token });
		} else {
			return res.send("Invalid Credentials");
		}
	});
});

module.exports = { userController };
