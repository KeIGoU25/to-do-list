const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();

const port = 8080;
const usernameDb = process.env.USERNAMEDB;
const passwordDb = process.env.PASSWORDDB;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

const { MongoClient } = require('mongodb');
let crd = `${usernameDb} and ${passwordDb}`;
const uri = `mongodb+srv://${usernameDb}:${passwordDb}@cluster0.4s3pmiy.mongodb.net/todoDb?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

app.post('/submit', async (req, res) => {
  const id = req.body.id;
  const task = req.body.task;

  try {
    await client.connect();
    console.log("Connection success");

    const db = client.db('todoDb'); // Reference the database
    const taskCollection = db.collection('tasks'); // Reference a collection

    // Insert a document into the collection
    const result = await taskCollection.insertOne({
      id: id,
      task: task
    });

    console.log("Inserted:", result.insertedId);
    res.status(200).send({id, task});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in saving task");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Close...");
  }
});

async function retrieveData() {
  const db = client.db('todoDb');
  const collection = db.collection('tasks');

  try {
      await client.connect();

      const query = {}; // You can customize your query here
      const result = await collection.find(query).toArray();
      return result;
  } catch (err) {
      console.error("Error retrieving data:", err);
  } finally {
      client.close();
  }
}

app.get('/api/data', async (req, res) => {
    const dataArray = await retrieveData();
    res.json(dataArray);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(path.join(__dirname, '../public'));
});



