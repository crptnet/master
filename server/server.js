const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:O4xbLRu9qobdQnGk@cluster0.z7iqllx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


const PORT = 5000
async function run(){
    try {
        app.listen(PORT, () => console.log("Server started on port " + PORT))
        
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

run()