const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 1. PLACE ORDER (Checkout Page Call Karega)
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
      paymentMethod,
      cardDetails,
      subtotal,
      deliveryFee,
      tax,
      total,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      customer,
      items,
      paymentMethod,
      cardDetails,
      subtotal,
      deliveryFee,
      tax,
      total,
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Server error placing order" });
  }
});

// 2. GET ALL ORDERS (Admin Dashboard Call Karega)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Naya order sabse pehle dikhayega
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ success: false, message: "Server error fetching orders" });
  }
});

// 3. UPDATE ORDER STATUS (Admin Dropdown Call Karega)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ success: false, message: "Server error updating status" });
  }
});

module.exports = router;