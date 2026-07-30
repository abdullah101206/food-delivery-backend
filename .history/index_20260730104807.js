const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes Import Karein
const orderRoutes = require("./routes/orderRoutes"); // Apne order routes ka path check kar lein

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String (Mongoose Format)
const uri = "mongodb://abdullah101206_db_user:s5dlWLfQBKqQywOl@cluster0-shard-00-00.fy9x6sn.mongodb.net:27017,cluster0-shard-00-01.fy9x6sn.mongodb.net:27017,cluster0-shard-00-02.fy9x6sn.mongodb.net:27017/?ssl=true&replicaSet=atlas-fy9x6sn-shard-0&authSource=admin&retryWrites=true&w=majority";

// MongoDB Connect using Mongoose
mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB Database successfully connected"))
  .catch((err) => console.error("❌ MongoDB Connection error:", err));

// Routes
app.use("/api/orders", orderRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});