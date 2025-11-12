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

    const db = client.db('Habit_Tracker_DB'); //databse select
    const habitsCollection = db.collection('habits'); //collection select

    //✅ all get
    app.get('/habits', async (req, res) => {
      const cursor = habitsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    //  CREATE one
    app.post('/habits/add', async (req, res) => {
      try {
        const newHabit = req.body;
        const result = await habitsCollection.insertOne(newHabit);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create user', error: err });
      }
    });


    // Some newest habits (6 Habits)
    app.get('/habits/featured', async (req, res) => {
      const cursor = habitsCollection.find().sort({ createdDate: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result)
    })


    // Get all habits by userEmail (Path param)
    app.get("/habits/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const result = await habitsCollection.find({ userEmail: email }).toArray();
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch habits", error: err });
      }
    });


    // ✅ DELETE
    app.delete('/habits/delete/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const result = await habitsCollection.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err });
      }
    });





  }
  finally {

  }
}

run().catch(console.dir)

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
