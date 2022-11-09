const express = require ('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lt8wotk.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const filmServiceCollection = client.db('filmServices').collection('services');

        app.get('/services', async(req, res) => {
            const query = {}
            const cursor = filmServiceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/allServices', async(req, res) => {
            const query = {}
            const cursor = filmServiceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })


    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('film service review server is running')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})