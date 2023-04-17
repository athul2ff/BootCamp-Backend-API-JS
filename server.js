const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

// Body parser
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

// Routes files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const auth = require("./routes/auth");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// app.use(logger);

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server & exit process
  server.close(() => process.exit(1));
});
