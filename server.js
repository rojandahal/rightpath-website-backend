const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/errors/api-error-handler");
// const morgan = require("morgan");
// const fs = require("fs");
// const path = require("path")

// Initializing environment vairables
dotenv.config();

const app = express();

// log all requests to access.log
// app.use(
//   morgan('combined', {
//     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
//       flags: 'a'
//     })
//   })
// )

//Connect to database
//Body parser
// Use of cors
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  headers: "content-type",
  methods: ["GET", "POST", "PUT", "DELETE"]
};
app.options("*",cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// Cookies parser
app.use(cookieParser());

//Connecting database
const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongoose connection successfully!");
});

// Routes files
const documentRoutes = require("./src/routes/document");
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const photoRoutes = require("./src/routes/photo");

// Adding routes middlewares
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/photo", photoRoutes);

// Error handler
app.use(errorHandler);

// Environment variables
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log(
    `Server Running in ${ENVIRONMENT} PORT ${PORT}. Link: http://localhost:${PORT}/`
      .yellow
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`.red);
  // Close server and Exit process
  server.close(() => process.exit(1));
});
