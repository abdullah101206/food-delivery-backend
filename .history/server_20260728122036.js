  // server.js
  const express = require("express");
  const cors = require("cors");

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors({ origin: "http://localhost:3000" })); // Next.js URL
  app.use(express.json());

  // Dummy Menu Data Endpoint
  app.get("/api/menu", (req, res) => {
    const menuItems = [
      { id: "1", name: "Classic Cheeseburger", price: 12.99, image: "https://via.placeholder.com/150" },
      { id: "2", name: "Margherita Pizza", price: 15.50, image: "https://via.placeholder.com/150" },
      { id: "3", name: "Crispy French Fries", price: 4.99, image: "https://via.placeholder.com/150" },
      { id: "4", name: "Chocolate Lava Cake", price: 6.50, image: "https://via.placeholder.com/150" }
    ];
    res.json(menuItems);
  });

  // Checkout & Order Placement Endpoint
  app.post("/api/checkout", (req, res) => {
    try {
      const { items, customerDetails } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }

      if (!customerDetails || !customerDetails.name || !customerDetails.address) {
        return res.status(400).json({ success: false, message: "Missing customer details" });
      }

      // Subtotal aur Total calculation (Always calculate on Server-side for security)
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Dynamic Order ID
      const orderId = `ORD-${Date.now()}`;

      // Here you can save 'order' to MongoDB/PostgreSQL or trigger Payment Gateway
      console.log("Order Processed:", { orderId, items, customerDetails, totalAmount });

      return res.status(200).json({
        success: true,
        message: "Order placed successfully!",
        orderId,
        totalAmount
      });
    } catch (error) {
      console.error("Checkout Error:", error);
      return res.status(500).json({ success: false, message: "Server error occurred" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
  });