const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI variable is missing in .env file");
    }

    uri = uri.trim().replace(/^["']|["']$/g, "");

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;