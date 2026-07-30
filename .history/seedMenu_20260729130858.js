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
  { name: "Mutton Handi", category: "Desi Food", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800", price: 21.99, rating: 4.4, bestseller: false },
  { name: "Chicken Qorma", category: "Desi Food", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800", price: 16.99, rating: 4.3, bestseller: false },
  { name: "Mutton Qorma", category: "Desi Food", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800", price: 20.99, rating: 4.2, bestseller: false },
  { name: "Nihari", category: "Desi Food", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800", price: 14.99, rating: 4.8, bestseller: true },
  { name: "Haleem", category: "Desi Food", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800", price: 11.99, rating: 4.4, bestseller: false },
  { name: "Chicken Pulao", category: "Desi Food", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=800", price: 12.99, rating: 4.1, bestseller: false },
  { name: "Dal Makhni", category: "Desi Food", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800", price: 10.99, rating: 3.9, bestseller: false },
  { name: "Chicken Tikka", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 14.99, rating: 4.8, bestseller: true },
  { name: "Mutton Tikka", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800", price: 18.99, rating: 4.6, bestseller: true },
  { name: "Chicken Malai Boti", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800", price: 13.49, rating: 4.7, bestseller: true },
  { name: "Mutton Boti", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", price: 17.99, rating: 4.5, bestseller: false },
  { name: "Chicken Seekh Kebab", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2c52?w=800", price: 12.99, rating: 4.4, bestseller: false },
  { name: "Mutton Seekh Kebab", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1625944525533-473f5a7b2d1f?w=800", price: 15.99, rating: 4.3, bestseller: false },
  { name: "Chicken Gola Kebab", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1605478371310-a9f1b8c8f4a5?w=800", price: 11.99, rating: 4.2, bestseller: false },
  { name: "Chicken Bihari Boti", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1625944525693-0a4c5c5f3f10?w=800", price: 14.49, rating: 4.6, bestseller: true },
  { name: "Chicken Wings BBQ", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 10.99, rating: 4.5, bestseller: false },
  { name: "Reshmi Kebab", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800", price: 13.99, rating: 4.4, bestseller: false },
  { name: "Chicken Grill Leg Piece", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1625944525523-3f4d7c9a2c91?w=800", price: 12.49, rating: 4.3, bestseller: false },
  { name: "Chicken Grill Chest", category: "BBQ & Grilled", image: "https://images.unsplash.com/photo-1604908554027-1c5a6d2d0a83?w=800", price: 13.99, rating: 4.4, bestseller: false },
  { name: "Chicken Burger", category: "Fast Food", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 6.99, rating: 4.5, bestseller: true },
  { name: "Beef Burger", category: "Fast Food", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800", price: 7.99, rating: 4.4, bestseller: false },
  { name: "Zinger Burger", category: "Fast Food", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 5.99, rating: 4.6, bestseller: true },
  { name: "Cheese Burger", category: "Fast Food", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800", price: 6.49, rating: 4.3, bestseller: false },
  { name: "Chicken Pizza", category: "Fast Food", image: "https://images.unsplash.com/photo-1601924928376-3a6b6c3d3b6c?w=800", price: 11.99, rating: 4.5, bestseller: true },
  { name: "Pepperoni Pizza", category: "Fast Food", image: "https://images.unsplash.com/photo-1548365328-9f547f6b7f4d?w=800", price: 12.99, rating: 4.6, bestseller: true },
  { name: "BBQ Pizza", category: "Fast Food", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800", price: 13.49, rating: 4.5, bestseller: false },
  { name: "Shawarma", category: "Fast Food", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800", price: 4.99, rating: 4.3, bestseller: false },
  { name: "Chicken Sandwich", category: "Fast Food", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800", price: 5.49, rating: 4.2, bestseller: false },
  { name: "Club Sandwich", category: "Fast Food", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800", price: 6.49, rating: 4.3, bestseller: false },
  { name: "French Fries", category: "Fast Food", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800", price: 3.99, rating: 4.2, bestseller: false },
  { name: "Chicken Nuggets", category: "Fast Food", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800", price: 5.99, rating: 4.4, bestseller: false },
  { name: "Chicken Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800", price: 4.99, rating: 4.3, bestseller: false },
  { name: "Beef Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 5.49, rating: 4.2, bestseller: false },
  { name: "Spicy Chicken Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800", price: 5.99, rating: 4.4, bestseller: true },
  { name: "Grilled Chicken Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800", price: 6.49, rating: 4.5, bestseller: true },
  { name: "Chicken Paratha Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 4.49, rating: 4.2, bestseller: false },
  { name: "Beef Paratha Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 4.99, rating: 4.3, bestseller: false },
  { name: "Egg Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 3.99, rating: 4.1, bestseller: false },
  { name: "BBQ Chicken Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800", price: 5.99, rating: 4.3, bestseller: false },
  { name: "Veg Wrap", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 3.99, rating: 4.0, bestseller: false },
  { name: "Chicken Mayo Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 4.49, rating: 4.2, bestseller: false },
  { name: "Zinger Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800", price: 5.49, rating: 4.4, bestseller: true },
  { name: "Tikka Roll", category: "Wraps", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 5.99, rating: 4.5, bestseller: true },
  { name: "Chicken Chow Mein", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800", price: 8.99, rating: 4.4, bestseller: false },
  { name: "Beef Chow Mein", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800", price: 9.49, rating: 4.3, bestseller: false },
  { name: "Chicken Fried Rice", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", price: 7.99, rating: 4.5, bestseller: true },
  { name: "Egg Fried Rice", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", price: 6.99, rating: 4.3, bestseller: false },
  { name: "Chicken Manchurian", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 9.99, rating: 4.6, bestseller: true },
  { name: "Sweet & Sour Chicken", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 10.49, rating: 4.5, bestseller: false },
  { name: "Beef Chilli Dry", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 11.49, rating: 4.4, bestseller: false },
  { name: "Chicken Ramen", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", price: 9.99, rating: 4.6, bestseller: true },
  { name: "Beef Ramen", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", price: 10.49, rating: 4.5, bestseller: false },
  { name: "Lasagna", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 12.99, rating: 4.7, bestseller: true },
  { name: "Chicken Pasta", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800", price: 11.99, rating: 4.6, bestseller: true },
  { name: "Grilled Steak", category: "Asian & Continental", image: "https://images.unsplash.com/photo-1604908177522-040c6f5c6c9d?w=800", price: 14.99, rating: 4.8, bestseller: true },
  { name: "Chocolate Cake", category: "Desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800", price: 4.99, rating: 4.7, bestseller: true },
  { name: "Brownie", category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800", price: 3.99, rating: 4.6, bestseller: false },
  { name: "Cheesecake", category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800", price: 5.49, rating: 4.8, bestseller: true },
  { name: "Ice Cream Sundae", category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", price: 4.99, rating: 4.5, bestseller: false },
  { name: "Vanilla Ice Cream", category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", price: 2.99, rating: 4.3, bestseller: false },
  { name: "Chocolate Ice Cream", category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", price: 3.49, rating: 4.4, bestseller: false },
  { name: "Strawberry Ice Cream", category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", price: 3.49, rating: 4.4, bestseller: false },
  { name: "Oreo Ice Cream", category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", price: 4.49, rating: 4.6, bestseller: false },
  { name: "Three Milk Cake", category: "Desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800", price: 5.99, rating: 4.7, bestseller: true },
  { name: "Chocolate Lava Cake", category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800", price: 5.99, rating: 4.9, bestseller: true },
  { name: "Waffle", category: "Desserts", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800", price: 4.99, rating: 4.5, bestseller: false },
  { name: "Pancake", category: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800", price: 4.49, rating: 4.4, bestseller: false },
  { name: "Coca Cola", category: "Drinks", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800", price: 1.99, rating: 4.2, bestseller: false },
  { name: "Pepsi", category: "Drinks", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800", price: 1.99, rating: 4.2, bestseller: false },
  { name: "Sprite", category: "Drinks", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800", price: 1.99, rating: 4.2, bestseller: false },
  { name: "Miranda", category: "Drinks", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800", price: 1.99, rating: 4.2, bestseller: false },
  { name: "Vanilla Milkshake", category: "Drinks", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800", price: 3.99, rating: 4.5, bestseller: true },
  { name: "Chocolate Milkshake", category: "Drinks", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800", price: 4.49, rating: 4.6, bestseller: true },
  { name: "Strawberry Milkshake", category: "Drinks", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800", price: 4.49, rating: 4.6, bestseller: true },
  { name: "Cold Coffee", category: "Drinks", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800", price: 3.99, rating: 4.5, bestseller: false },
  { name: "Cappuccino", category: "Drinks", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800", price: 3.49, rating: 4.4, bestseller: false },
  { name: "Hot Chocolate", category: "Drinks", image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800", price: 3.99, rating: 4.5, bestseller: true }
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