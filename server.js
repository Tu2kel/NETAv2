const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");

// ... other imports
const path = require("path");

// Middleware
app.use(express.json()); // Parses data
app.use(morgan("dev")); // Logs to console

//middleware joining client / express.static sends static files requests to the client.
app.use(express.static(path.join(__dirname, "client", "dist")));

mongoose.set("strictQuery", true);

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Routes

// Routes for login, logout
app.use("/auth", require("./routes/authRouter"));

app.use("/user", require("./routes/userRouter")); //✅ User authentication routes

// Middleware for JWT authentication
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

// Add routes for political reviews, comments, and votes here
app.use("/api/review", require("./routes/reviewRouter.js"));
app.use("/api/comment", require("./routes/commentRouter"));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    errMsg: err.message,
  });
});

// "catchall" route handler / Final Handler / sends main index.html back to client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Server Listen
app.listen(7260, () => {
  console.log(`Listening on port 7260`);
});
