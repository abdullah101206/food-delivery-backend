const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();  

app.use(
  cors({
    origin: [
      "https://food-delivery-frontend-nu-three.vercel.app",
      "https://the-flavor-haven.vercel.app",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/menu", require("./routes/menuRoutes")); 
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});