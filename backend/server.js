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

app.post('/submit', (req, res) => {
  const task = req.body.task;

  console.log('Task' + task);
  res.send(task);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(path.join(__dirname, '../public'));
});

// const { MongoClient } = require('mongodb');
// let crd = `${usernameDb} and ${passwordDb}`;
// const uri = `mongodb+srv://${usernameDb}:${passwordDb}@cluster0.4s3pmiy.mongodb.net/test?retryWrites=true&w=majority`;

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connection success");

//     const db = client.db('todoDb1'); // Reference the database
//     const taskCollection = db.collection('tasks1'); // Reference a collection

//     // Insert a document into the collection
//     const result = await taskCollection.insertOne({
//       title: 'Complete the project',
//       status: 'In Progress'
//     });

//     console.log("Inserted:", result.insertedId);

//   } catch (err) {
//     console.error(err);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//     console.log("Close...");
//   }
// }

// run().catch(console.dir);
