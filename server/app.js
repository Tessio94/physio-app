const path = require("path");
require("dotenv").config();

const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) =>
  res.send(`<h1>${path.resolve(__dirname, "../client/build")}</h1>`)
);

app.use("/api/v1/", userRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build"));
// });

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
