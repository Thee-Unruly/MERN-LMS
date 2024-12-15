require("dotenv").config(); // Import dotenv
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL, // Client URL allowed to access the server
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON

// Database connection
mongoose
  .connect(MONGO_URI) // Just pass the connection URI directly
  .then(() => console.log('MongoDB connection established'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
