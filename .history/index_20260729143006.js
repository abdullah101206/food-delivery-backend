const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://abdullah101206_db_user:s5dlWLfQBKqQywOl@cluster0.fy9x6sn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Database successfully connect");
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}

connectDB();