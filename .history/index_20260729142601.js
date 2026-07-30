const { MongoClient } = require('mongodb');

// Step 2 mein jo link aapne taiyar kiya tha, wo yahan paste karein:
const uri = "mongodb+srv://YOUR_USERNAME:s5dlWLfQBKqQywOl@cluster0.fy9x6sn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    // Database se connect ho rahe hain
    await client.connect();
    console.log(" MongoDB  successful connection ho gaya hai!");

  } catch (error) {
    console.error("Connection mein masla aaya:", error);
  } finally {
    await client.close();
  }
}

connectDB();    