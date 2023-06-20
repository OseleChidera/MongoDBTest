const express = require('express')
const app = express()
app.use(express.json())
const { MongoClient } = require('mongodb');

app.get('/', (req, res) => {
  res.send('welcome')
})


app.get('/users', (req, res) => {
  console.log('/users route ')
  MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    console.log('connection successful');
    if (err) {
      console.log(err);
      res.status(500).send('Error connecting to the database.');
      return;
    }
    const db = client.db('myTestDb');
    const collection = client.collection('users');

    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error executing the query.');
        return;
      }
      console.log(data);
      res.json(data);
    });
    client.close();
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});