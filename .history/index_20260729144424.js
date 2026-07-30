const { MongoClient } = require('mongodb');

// Non-SRV connection string (DNS issue se bachne ke liye)
const uri = "mongodb://abdullah101206_db_user:s5dlWLfQBKqQywOl@cluster0-shard-00-00.fy9x6sn.mongodb.net:27017,cluster0-shard-00-01.fy9x6sn.mongodb.net:27017,cluster0-shard-00-02.fy9x6sn.mongodb.net:27017/?ssl=true&replicaSet=atlas-fy9x6sn-shard-0&authSource=admin&retryWrites=true&w=majority";

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