const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const authentication = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.send("Please Login Again");
	}
	const token = req.headers.authorization.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
		if (error) {
			res.send("Please Login Again");
		} else {
			req.body.userId = decoded.id;
			next();
		}
	});
};

module.exports = authentication;
