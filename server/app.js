////////////////////////packages/////////////////////////////
const path = require("path");
require("dotenv").config();

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const cors = require("cors");
///////////////////////modules////////////////////////////////
const corsOptions = {
	// origin: "http://localhost:5173", // Frontend URL (React app)
	origin: "https://physio-app-frontend.onrender.com",
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true, // Allow cookies to be sent
};
/////////////////////////////////////////////////////////////////////
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/loginRouter");
/////////////////////////////////////////////////////////////

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) =>
	res.send(`<h1>${path.resolve(__dirname, "../client/build")}</h1>`)
);

app.use("/api/v1", userRouter);
app.use("/auth", loginRouter);

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
