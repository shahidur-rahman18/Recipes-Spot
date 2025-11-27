// server.js (or app.js)

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken"); // 1. ADDED: For creating tokens
const cookieParser = require("cookie-parser"); // 1. ADDED: For handling cookies

const PORT = 5000;

// --- CONFIGURATION ---
const JWT_SECRET = process.env.JWT_SECRET || "your-default-secure-secret-key";
// NOTE: Ideally, set JWT_SECRET in your .env file

// middleware
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
app.use(
  cors({
    origin:[BASE_URL.replace(/\/$/, '')], 
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser()); // 2. ADDED: Cookie parser middleware

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
    const recipesCollection = db.collection("recipes"); // Assuming you have a 'users' collection for login checks
    const usersCollection = db.collection("users");

    // ==========================================================
    // 3. ADDED: Authentication Route to set the HTTP-Only Cookie
    // ==========================================================
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      // 1. Placeholder for User Verification (Replace with real logic)
      // Find user by email and verify password hash (not plain text comparison!)
      const user = await usersCollection.findOne({ email });

      // --- Dummy Check for Demo Purposes ---
      if (!user) {
        // If user not found, reject
        return res.status(401).send({ message: "User not found." });
      }
      // In a real app, compare password with user.hashedPassword
      if (password !== "123456") {
        // Replace "123456" with the logic to check user.password
        return res.status(401).send({ message: "Invalid credentials." });
      }
      // ------------------------------------

      // 2. Generate Authentication Token (JWT)
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // 3. Set the Token as an HTTP-Only Cookie
      res.cookie("token", token, {
        httpOnly: true, // Crucial for security and Next.js middleware
        secure: process.env.NODE_ENV === "production", // Use 'secure: true' in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "lax", // Use 'lax' or 'strict'
      });

      // 4. Send Success Response
      res.send({
        success: true,
        message: "Login successful",
        user: { email: user.email },
      });
    }); // Save a plant data in db
    // ==========================================================

    app.post("/recipes", async (req, res) => {
      const recipeData = req.body;
      console.log(recipeData);
      const result = await recipesCollection.insertOne(recipeData);
      res.send(result);
    }); // get all plants from db
    app.get("/recipes", async (req, res) => {
      const result = await recipesCollection.find().toArray();
      res.send(result);
    }); // get single plant from db

    app.get("/recipes/:id", async (req, res) => {
      const id = req.params.id; // Added validation for ObjectId to prevent 500 errors
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid recipe ID format." });
      }
      const result = await recipesCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    }); // Send a ping to confirm a successful connection

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
