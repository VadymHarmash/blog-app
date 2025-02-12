const express = require("express");
const userRoute = require("./routers/userRoute");
const cors = require("cors");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);

app.use("/api", userRoute);

connectDB();

app.listen(PORT, () =>
  PORT
    ? console.log(`Listening port ${PORT}`)
    : console.log("Error at starting"),
);
