////////////////////////packages/////////////////////////////
const path = require("path");
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
///////////////////////modules////////////////////////////////
const userRouter = require("./routes/userRoutes");
/////////////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
	res.send(`<h1>${path.resolve(__dirname, "../client/build")}</h1>`)
);

app.use("/api/v1", userRouter);

////////////////////////////////server start//////////////////////
const port = process.env.PORT || 3000;

const start = () => {
	try {
		app.listen(3000, () => {
			console.log(`Server is listening on ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
