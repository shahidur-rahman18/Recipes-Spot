const express = require("express");
const app = express();
const PORT = 5000; // Choose any available port, 5000 is common

// 1. Define a simple route to test
app.get("/", (req, res) => {
  res.send("RecipeSpot Backend is Running and Ready!");
});

// 2. Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// --- Save this file ---
