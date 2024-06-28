const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const transferRoutes = require("./routes/transfers");
app.use("/api/transfers", transferRoutes);

const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
