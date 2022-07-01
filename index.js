const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6bl2t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('to-do-app-dv').collection('tosos');


        // For todo
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = todoCollection.find(query);
            const todo = await cursor.toArray();
            res.send(todo);
        })
        app.get('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const todo = await todoCollection.findOne(query)
            res.send(product)
        })



        // Delete todo
        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/todo', async (req, res) => {
            const newTodo = req.body;
            const result = await todoCollection.insertOne(newTodo);
            res.send(result);
        }) 


        // for all todo
        app.get('/todo', async (req, res) => {
            const todo = await todoCollection.find().toArray()
            res.send(todo)
        })



    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Todo app listening on port ${port}`)
})