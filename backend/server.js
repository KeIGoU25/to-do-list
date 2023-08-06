const express = require('express');
const app = express();
const path = require('path');

const port = 8080;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(path.join(__dirname, '../public'));
});

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kswag22l:oyAjB0CMDApGUx4D@cluster0.4s3pmiy.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connection success");

    const db = client.db('todoDb1'); // Reference the database
    const taskCollection = db.collection('tasks1'); // Reference a collection

    // Insert a document into the collection
    const result = await taskCollection.insertOne({
      title: 'Complete the project',
      status: 'In Progress'
    });

    console.log("Inserted:", result.insertedId);

  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Close...");
  }
}

run().catch(console.dir);
