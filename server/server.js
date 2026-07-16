// Import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const photoRoutes = require("./routes/photoRoutes");

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello from CarLi Booth Backend! 👋",
  });
});

// Register photo routes
app.use("/api/photos", photoRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});