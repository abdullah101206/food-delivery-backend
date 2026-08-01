const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

const MONGO_URI = "mongodb://abdullah101206_db_user:ynTuWj2K35hPRYCK@ac-mqi1fuo-shard-00-00.fy9x6sn.mongodb.net:27017,ac-mqi1fuo-shard-00-01.fy9x6sn.mongodb.net:27017,ac-mqi1fuo-shard-00-02.fy9x6sn.mongodb.net:27017/restaurantDB?ssl=true&replicaSet=atlas-txxglu-shard-0&authSource=admin&appName=Cluster0";

const menuItems = [
    { name: "Chicken Biryani", category: "Desi Food", image: "https://images.pexels.com/photos/23830980/pexels-photo-23830980.jpeg", price: 13.99, rating: 4.9, bestseller: true },
    { name: "Mutton Biryani", category: "Desi Food", image: "https://images.pexels.com/photos/9609863/pexels-photo-9609863.jpeg", price: 15.99, rating: 4.7, bestseller: true },
    { name: "Chicken Karahi", category: "Desi Food", image: "https://images.pexels.com/photos/25884474/pexels-photo-25884474.jpeg", price: 18.99, rating: 4.8, bestseller: true },
    { name: "Mutton Karahi", category: "Desi Food", image: "https://images.pexels.com/photos/9609846/pexels-photo-9609846.jpeg", price: 22.99, rating: 4.6, bestseller: false },
    { name: "Chicken Handi", category: "Desi Food", image: "https://images.pexels.com/photos/34159108/pexels-photo-34159108.jpeg", price: 17.49, rating: 4.5, bestseller: false },
    { name: "Mutton Handi", category: "Desi Food", image: "https://images.pexels.com/photos/29685045/pexels-photo-29685045.jpeg", price: 21.99, rating: 4.4, bestseller: false },
    { name: "Chicken Qorma", category: "Desi Food", image: "https://images.pexels.com/photos/35629938/pexels-photo-35629938.jpeg", price: 16.99, rating: 4.3, bestseller: false },
    { name: "Mutton Qorma", category: "Desi Food", image: "https://images.pexels.com/photos/38324444/pexels-photo-38324444.jpeg", price: 20.99, rating: 4.2, bestseller: false },
    { name: "Nihari", category: "Desi Food", image: "https://images.pexels.com/photos/18852556/pexels-photo-18852556.jpeg", price: 14.99, rating: 4.8, bestseller: true },
    { name: "Haleem", category: "Desi Food", image: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg", price: 11.99, rating: 4.4, bestseller: false },
    { name: "Chicken Pulao", category: "Desi Food", image: "https://images.pexels.com/photos/37404183/pexels-photo-37404183.jpeg", price: 12.99, rating: 4.1, bestseller: false },
    { name: "Dal Makhni", category: "Desi Food", image: "https://images.pexels.com/photos/19834445/pexels-photo-19834445.jpeg", price: 10.99, rating: 3.9, bestseller: false },

    { name: "Chicken Tikka", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/29173114/pexels-photo-29173114.jpeg", price: 14.99, rating: 4.8, bestseller: true },
    { name: "Mutton Tikka", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/36552966/pexels-photo-36552966.jpeg", price: 18.99, rating: 4.6, bestseller: true },
    { name: "Chicken Malai Boti", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/37667707/pexels-photo-37667707.jpeg", price: 13.49, rating: 4.7, bestseller: true },
    { name: "Mutton Boti", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/8104900/pexels-photo-8104900.jpeg", price: 17.99, rating: 4.5, bestseller: false },
    { name: "Chicken Seekh Kebab", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/5175619/pexels-photo-5175619.jpeg", price: 12.99, rating: 4.4, bestseller: false },
    { name: "Mutton Seekh Kebab", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/18698225/pexels-photo-18698225.jpeg", price: 15.99, rating: 4.3, bestseller: false },
    { name: "Chicken Gola Kebab", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/7301037/pexels-photo-7301037.jpeg", price: 11.99, rating: 4.2, bestseller: false },
    { name: "Chicken Bihari Boti", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/36879455/pexels-photo-36879455.jpeg", price: 14.49, rating: 4.6, bestseller: true },
    { name: "Chicken Wings BBQ", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/36798124/pexels-photo-36798124.jpeg", price: 10.99, rating: 4.5, bestseller: false },
    { name: "Reshmi Kebab", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/37058644/pexels-photo-37058644.jpeg", price: 13.99, rating: 4.4, bestseller: false },
    { name: "Chicken Grill Leg Piece", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/37417613/pexels-photo-37417613.jpeg", price: 12.49, rating: 4.3, bestseller: false },
    { name: "Chicken Grill Chest", category: "BBQ & Grilled", image: "https://images.pexels.com/photos/37575745/pexels-photo-37575745.jpeg", price: 13.99, rating: 4.4, bestseller: false },

    { name: "Chicken Burger", category: "Fast Food", image: "https://images.pexels.com/photos/9207184/pexels-photo-9207184.jpeg", price: 6.99, rating: 4.5, bestseller: true },
    { name: "Beef Burger", category: "Fast Food", image: "https://images.pexels.com/photos/8305726/pexels-photo-8305726.jpeg", price: 7.99, rating: 4.4, bestseller: false },
    { name: "Zinger Burger", category: "Fast Food", image: "https://images.pexels.com/photos/9211149/pexels-photo-9211149.jpeg", price: 5.99, rating: 4.6, bestseller: true },
    { name: "Cheese Burger", category: "Fast Food", image: "https://images.pexels.com/photos/19247563/pexels-photo-19247563.jpeg", price: 6.49, rating: 4.3, bestseller: false },
    { name: "Chicken Pizza", category: "Fast Food", image: "https://images.pexels.com/photos/20115307/pexels-photo-20115307.jpeg", price: 11.99, rating: 4.5, bestseller: true },
    { name: "Pepperoni Pizza", category: "Fast Food", image: "https://images.pexels.com/photos/31587831/pexels-photo-31587831.jpeg", price: 12.99, rating: 4.6, bestseller: true },
    { name: "BBQ Pizza", category: "Fast Food", image: "https://images.pexels.com/photos/33458049/pexels-photo-33458049.jpeg", price: 13.49, rating: 4.5, bestseller: false },
    { name: "Shawarma", category: "Fast Food", image: "https://images.pexels.com/photos/5779364/pexels-photo-5779364.jpeg", price: 4.99, rating: 4.3, bestseller: false },
    { name: "Chicken Sandwich", category: "Fast Food", image: "https://images.pexels.com/photos/33014388/pexels-photo-33014388.jpeg", price: 5.49, rating: 4.2, bestseller: false },
    { name: "Club Sandwich", category: "Fast Food", image: "https://images.pexels.com/photos/15362507/pexels-photo-15362507.jpeg", price: 6.49, rating: 4.3, bestseller: false },
    { name: "French Fries", category: "Fast Food", image: "https://images.pexels.com/photos/15754939/pexels-photo-15754939.jpeg", price: 3.99, rating: 4.2, bestseller: false },
    { name: "Chicken Nuggets", category: "Fast Food", image: "https://images.pexels.com/photos/11710530/pexels-photo-11710530.jpeg", price: 5.99, rating: 4.4, bestseller: false },

    { name: "Chicken Wrap", category: "Wraps", image: "https://images.pexels.com/photos/9624298/pexels-photo-9624298.jpeg", price: 4.99, rating: 4.3, bestseller: false },
    { name: "Beef Wrap", category: "Wraps", image: "https://images.pexels.com/photos/36750267/pexels-photo-36750267.jpeg", price: 5.49, rating: 4.2, bestseller: false },
    { name: "Spicy Chicken Wrap", category: "Wraps", image: "https://images.pexels.com/photos/12737661/pexels-photo-12737661.jpeg", price: 5.99, rating: 4.4, bestseller: true },
    { name: "Grilled Chicken Wrap", category: "Wraps", image: "https://images.pexels.com/photos/18852568/pexels-photo-18852568.jpeg", price: 6.49, rating: 4.5, bestseller: true },
    { name: "Chicken Paratha Roll", category: "Wraps", image: "https://images.pexels.com/photos/13292629/pexels-photo-13292629.png", price: 4.49, rating: 4.2, bestseller: false },
    { name: "Beef Paratha Roll", category: "Wraps", image: "https://images.pexels.com/photos/18007687/pexels-photo-18007687.jpeg", price: 4.99, rating: 4.3, bestseller: false },
    { name: "Egg Roll", category: "Wraps", image: "https://images.pexels.com/photos/24738514/pexels-photo-24738514.jpeg", price: 3.99, rating: 4.1, bestseller: false },
    { name: "BBQ Chicken Wrap", category: "Wraps", image: "https://images.pexels.com/photos/37322775/pexels-photo-37322775.jpeg", price: 5.99, rating: 4.3, bestseller: false },
    { name: "Veg Wrap", category: "Wraps", image: "https://images.pexels.com/photos/9980764/pexels-photo-9980764.jpeg", price: 3.99, rating: 4.0, bestseller: false },
    { name: "Chicken Mayo Roll", category: "Wraps", image: "https://images.pexels.com/photos/33014398/pexels-photo-33014398.jpeg", price: 4.49, rating: 4.2, bestseller: false },
    { name: "Zinger Roll", category: "Wraps", image: "https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg", price: 5.49, rating: 4.4, bestseller: true },
    { name: "Tikka Roll", category: "Wraps", image: "https://images.pexels.com/photos/38108419/pexels-photo-38108419.jpeg", price: 5.99, rating: 4.5, bestseller: true },

    { name: "Chicken Chow Mein", category: "Asian & Continental", image: "https://images.pexels.com/photos/34170982/pexels-photo-34170982.jpeg", price: 8.99, rating: 4.4, bestseller: false },
    { name: "Beef Chow Mein", category: "Asian & Continental", image: "https://images.pexels.com/photos/18805709/pexels-photo-18805709.jpeg", price: 9.49, rating: 4.3, bestseller: false },
    { name: "Chicken Fried Rice", category: "Asian & Continental", image: "https://images.pexels.com/photos/34668501/pexels-photo-34668501.jpeg", price: 7.99, rating: 4.5, bestseller: true },
    { name: "Egg Fried Rice", category: "Asian & Continental", image: "https://images.pexels.com/photos/28503583/pexels-photo-28503583.jpeg", price: 6.99, rating: 4.3, bestseller: false },
    { name: "Chicken Manchurian", category: "Asian & Continental", image: "https://images.pexels.com/photos/35071821/pexels-photo-35071821.jpeg", price: 9.99, rating: 4.6, bestseller: true },
    { name: "Sweet & Sour Chicken", category: "Asian & Continental", image: "https://images.pexels.com/photos/5848525/pexels-photo-5848525.jpeg", price: 10.49, rating: 4.5, bestseller: false },
    { name: "Beef Chilli Dry", category: "Asian & Continental", image: "https://images.pexels.com/photos/1618906/pexels-photo-1618906.jpeg", price: 11.49, rating: 4.4, bestseller: false },
    { name: "Chicken Ramen", category: "Asian & Continental", image: "https://images.pexels.com/photos/27219790/pexels-photo-27219790.jpeg", price: 9.99, rating: 4.6, bestseller: true },
    { name: "Beef Ramen", category: "Asian & Continental", image: "https://images.pexels.com/photos/15298810/pexels-photo-15298810.jpeg", price: 10.49, rating: 4.5, bestseller: false },
    { name: "Lasagna", category: "Asian & Continental", image: "https://images.pexels.com/photos/34474031/pexels-photo-34474031.jpeg", price: 12.99, rating: 4.7, bestseller: true },
    { name: "Chicken Pasta", category: "Asian & Continental", image: "https://images.pexels.com/photos/17636472/pexels-photo-17636472.jpeg", price: 11.99, rating: 4.6, bestseller: true },
    { name: "Grilled Steak", category: "Asian & Continental", image: "https://images.pexels.com/photos/18824031/pexels-photo-18824031.jpeg", price: 14.99, rating: 4.8, bestseller: true },

    { name: "Chocolate Cake", category: "Desserts", image: "https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg", price: 4.99, rating: 4.7, bestseller: true },
    { name: "Brownie", category: "Desserts", image: "https://images.pexels.com/photos/9170501/pexels-photo-9170501.jpeg", price: 3.99, rating: 4.6, bestseller: false },
    { name: "Cheesecake", category: "Desserts", image: "https://images.pexels.com/photos/38495630/pexels-photo-38495630.jpeg", price: 5.49, rating: 4.8, bestseller: true },
    { name: "Ice Cream Sundae", category: "Desserts", image: "https://images.pexels.com/photos/26867904/pexels-photo-26867904.jpeg", price: 4.99, rating: 4.5, bestseller: false },
    { name: "Vanilla Ice Cream", category: "Desserts", image: "https://images.pexels.com/photos/22809596/pexels-photo-22809596.jpeg", price: 2.99, rating: 4.3, bestseller: false },
    { name: "Chocolate Ice Cream", category: "Desserts", image: "https://images.pexels.com/photos/5061214/pexels-photo-5061214.jpeg", price: 3.49, rating: 4.4, bestseller: false },
    { name: "Strawberry Ice Cream", category: "Desserts", image: "https://images.pexels.com/photos/22484685/pexels-photo-22484685.jpeg", price: 3.49, rating: 4.4, bestseller: false },
    { name: "Oreo Ice Cream", category: "Desserts", image: "https://images.pexels.com/photos/5060281/pexels-photo-5060281.jpeg", price: 4.49, rating: 4.6, bestseller: false },
    { name: "Three Milk Cake", category: "Desserts", image: "https://images.pexels.com/photos/10311530/pexels-photo-10311530.jpeg", price: 5.99, rating: 4.7, bestseller: true },
    { name: "Chocolate Lava Cake", category: "Desserts", image: "https://images.pexels.com/photos/27819688/pexels-photo-27819688.jpeg", price: 5.99, rating: 4.9, bestseller: true },
    { name: "Waffle", category: "Desserts", image: "https://images.pexels.com/photos/31377698/pexels-photo-31377698.jpeg", price: 4.99, rating: 4.5, bestseller: false },
    { name: "Pancake", category: "Desserts", image: "https://images.pexels.com/photos/37648012/pexels-photo-37648012.jpeg", price: 4.49, rating: 4.4, bestseller: false },

    { name: "Coca Cola", category: "Drinks", image: "https://images.pexels.com/photos/8302769/pexels-photo-8302769.jpeg", price: 1.99, rating: 4.2, bestseller: false },
    { name: "Pepsi", category: "Drinks", image: "https://images.pexels.com/photos/17461398/pexels-photo-17461398.jpeg", price: 1.99, rating: 4.2, bestseller: false },
    { name: "Sprite", category: "Drinks", image: "https://images.pexels.com/photos/31332092/pexels-photo-31332092.jpeg", price: 1.99, rating: 4.2, bestseller: false },
    { name: "Miranda", category: "Drinks", image: "https://images.pexels.com/photos/32751752/pexels-photo-32751752.jpeg", price: 1.99, rating: 4.2, bestseller: false },
    { name: "Vanilla Milkshake", category: "Drinks", image: "https://images.pexels.com/photos/30451538/pexels-photo-30451538.jpeg", price: 3.99, rating: 4.5, bestseller: true },
    { name: "Chocolate Milkshake", category: "Drinks", image: "https://images.pexels.com/photos/32469289/pexels-photo-32469289.jpeg", price: 4.49, rating: 4.6, bestseller: true },
    { name: "Strawberry Milkshake", category: "Drinks", image: "https://images.pexels.com/photos/34711204/pexels-photo-34711204.jpeg", price: 4.49, rating: 4.6, bestseller: true },
    { name: "Cold Coffee", category: "Drinks", image: "https://images.pexels.com/photos/38426418/pexels-photo-38426418.jpeg", price: 3.99, rating: 4.5, bestseller: false },
    { name: "Cappuccino", category: "Drinks", image: "https://images.pexels.com/photos/31139336/pexels-photo-31139336.jpeg", price: 3.49, rating: 4.4, bestseller: false },
    { name: "Hot Chocolate", category: "Drinks", image: "https://images.pexels.com/photos/11541312/pexels-photo-11541312.jpeg", price: 3.99, rating: 4.5, bestseller: true },
    { name: "Mint Lemonade", category: "Drinks", image: "https://images.pexels.com/photos/11009199/pexels-photo-11009199.jpeg", price: 2.99, rating: 4.5, bestseller: true },
    { name: "Lemon Iced Tea", category: "Drinks", image: "https://images.pexels.com/photos/33573166/pexels-photo-33573166.jpeg", price: 1.99, rating: 4.5, bestseller: false },
];

const optimizedMenuItems = menuItems.map(item => ({
    ...item,
    image: item.image.includes('?') 
        ? item.image 
        : `${item.image}?auto=compress&cs=tinysrgb&w=600`
}));

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB directly!");

        await MenuItem.deleteMany({});
        await MenuItem.insertMany(optimizedMenuItems);

        console.log("Database seeded with fast-loading images successfully!");
        process.exit();
    } catch (err) {
        console.error("Seeding error:", err.message);
        process.exit(1);
    }
};

seedDatabase();