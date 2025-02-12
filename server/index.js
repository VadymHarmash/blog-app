const express = require("express");
const userRoute = require("./routers/userRoute");
const postRoute = require("./routers/postRoute");
const cors = require("cors");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");

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
app.use("/api/posts", postRoute);

app.use(errorMiddleware);

connectDB();

app.listen(PORT, () =>
  PORT
    ? console.log(`Listening port ${PORT}`)
    : console.log("Error at starting"),
);
