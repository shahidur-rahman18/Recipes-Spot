const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = 5000; // Choose any available port, 5000 is common

// middleware
app.use(
  cors({
    origin: ["http://localhost:3000/"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    const db = client.db("recipesDB");
    const recipesCollection = db.collection("recipes");
   

    // Save a plant data in db
    app.post("/recipes", async (req, res) => {
      const plantData = req.body;
      console.log(plantData);
      const result = await recipesCollection.insertOne(plantData);
      res.send(result);
    });

    // get all plants from db
    app.get("/recipes", async (req, res) => {
      const result = await recipesCollection.find().toArray();
      res.send(result);
    });

    // get single plant from db

    app.get("/recipes/:id", async (req, res) => {
      const id = req.params.id;
      const result = await recipesCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

 

  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);










// 1. Define a simple route to test
app.get("/", (req, res) => {
  res.send("RecipeSpot Backend is Running and Ready!");
});

// 2. Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// --- Save this file ---
// 04QfbAEELYZmANoZ recipeSpotDB
// mongodb+srv://<db_username>:<db_password>@cluster0.kpwp5y5.mongodb.net/?appName=Cluster0
