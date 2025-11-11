const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 3000;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
console.log(port, user, pass);


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

// ✅ Server connect here
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db('habit-tracker_DB'); //databse select
    const habitsCollection = db.collection('habits'); //collection select

    //all get
    app.get('/habits', async (req, res) => {
      const cursor = habitsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    
    //all Some newest Data
    app.get('/habits/featured', async (req, res) => {
      const cursor = habitsCollection.find().sort({ createdDate: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result)
    })



    
  }
  finally {

  }
}

run().catch(console.dir)

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
