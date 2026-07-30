require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const MenuItem = require("./models/MenuItem");

const menuItems = [
  { name: "Chicken Biryani", category: "Desi Food", image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?w=800", price: 13.99, rating: 4.9, bestseller: true },
  { name: "Mutton Biryani", category: "Desi Food", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800", price: 15.99, rating: 4.7, bestseller: true },
  { name: "Chicken Karahi", category: "Desi Food", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", price: 18.99, rating: 4.8, bestseller: true },
  { name: "Mutton Karahi", category: "Desi Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800", price: 22.99, rating: 4.6, bestseller: false },
  { name: "Chicken Handi", category: "Desi Food", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800", price: 17.49, rating: 4.5, bestseller: false },
  { name: "Nihari", category: "Desi Food", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800", price: 14.99, rating: 4.8, bestseller: true },
  { name: "Haleem", category: "Desi Food", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800", price: 11.99, rating: 4.4, bestseller: false },
  { name: "Chicken Tikka", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 14.99, rating: 4.8, bestseller: true },
  { name: "Mutton Tikka", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800", price: 18.99, rating: 4.6, bestseller: true },
  { name: "Chicken Malai Boti", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800", price: 13.49, rating: 4.7, bestseller: true },
  { name: "Chicken Seekh Kebab", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2c52?w=800", price: 12.99, rating: 4.4, bestseller: false },
  { name: "Zinger Burger", category: "Fast Food", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 5.99, rating: 4.6, bestseller: true },
  { name: "Beef Burger", category: "Fast Food", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800", price: 7.99, rating: 4.4, bestseller: false },
  { name: "Pepperoni Pizza", category: "Fast Food", image: "https://images.unsplash.com/photo-1548365328-9f547f6b7f4d?w=800", price: 12.99, rating: 4.6, bestseller: true },
  { name: "French Fries", category: "Fast Food", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800", price: 3.99, rating: 4.2, bestseller: false },
  { name: "Spicy Chicken Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800", price: 5.99, rating: 4.4, bestseller: true },
  { name: "Zinger Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 5.49, rating: 4.4, bestseller: true },
  { name: "Chicken Chow Mein", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800", price: 8.99, rating: 4.4, bestseller: false },
  { name: "Chicken Fried Rice", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", price: 7.99, rating: 4.5, bestseller: true },
  { name: "Chocolate Lava Cake", category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800", price: 5.99, rating: 4.9, bestseller: true },
  { name: "Cheesecake", category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800", price: 5.49, rating: 4.8, bestseller: true },
  { name: "Chocolate Milkshake", category: "Drinks", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800", price: 4.49, rating: 4.6, bestseller: true },
  { name: "Cold Coffee", category: "Drinks", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800", price: 3.99, rating: 4.5, bestseller: false }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();