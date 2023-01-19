const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./Config/db");
const authentication = require("./Middleware/Authentication");
const { userController } = require("./Routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userController);
app.use(authentication);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
	try {
		await connection;
		console.log(`Listening on Port ${PORT}`);
	} catch (error) {
		console.log("Connection Failed");
		console.log(error.message);
	}
});
