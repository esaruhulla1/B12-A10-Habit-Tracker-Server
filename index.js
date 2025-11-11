const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;



// ✅ Middleware
app.use(cors());
app.use(express.json());

//Habit-Tracker
//pl82L5iFFa98mD90


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4u6lkgk.mongodb.net/?appName=Cluster0`;

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

    // const db = client.db(process.env.DB_NAME); //databse select
    // const usersCollection = db.collection('users'); //collection select
  }
  finally {

  }
}

run().catch(console.dir)


// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
