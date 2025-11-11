const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

//Habit-Tracker
//pl82L5iFFa98mD90

const uri = "mongodb+srv://Habit-Tracker:pl82L5iFFa98mD90@cluster0.4u6lkgk.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// ✅ Default route
app.get('/', (req, res) => {
  res.send('Hello from Node + Express server!');
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  finally {

  }
}

run().catch(console.dir)


// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
