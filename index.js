const express = require ('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        const reviewCollection = client.db('filmServices').collection('reviews');

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

        app.get('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const service = await filmServiceCollection.findOne(query);
            res.send(service);
        })

        app.post('/allReviews', async(req, res) => {
            const allReview = req.body;
            const result = await reviewCollection.insertOne(allReview);
            res.send(result); 
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