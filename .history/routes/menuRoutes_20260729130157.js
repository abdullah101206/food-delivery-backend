const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error: error.message });
  }
});

// Seed items via API (Optional)
router.post("/seed", async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    const seeded = await MenuItem.insertMany(req.body);
    res.status(201).json({ message: "Menu seeded successfully", count: seeded.length });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

module.exports = router;