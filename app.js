const mongo = require('mongodb');
const express = require('express');
const appServer = express();
const PORT = process.env.PORT || 3000;

appServer.use(express.json());

var url = "mongodb+srv://admin:btCafd9cdd1d29fY@pruebadedespliegue.uwb3h.mongodb.net/mydb?retryWrites=true&w=majority";

appServer.listen(PORT, () => {
    console.log("SERVER IS LISTEN ON PORT:" , PORT);
});

appServer.get('/get', async (req, res) => {
    var MongoClient = new mongo.MongoClient(url);
    const results = await findQuestionarys(MongoClient);
    res.send(results);
    console.log("Respuesta enviada");
});

async function findQuestionarys(client) {
    try {
        await client.connect();
        const options = {
            sort: {},
            projection: { _id: 0},
        };
        const cursor = client.db("mydb").collection('CuestionariosPublicos').find({}, options);
        const results = await cursor.toArray();
        return results;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

appServer.put('/put', async (req, res) => {
    var MongoClient = new mongo.MongoClient(url);
    addQuestionary(MongoClient, req.body);
    res.send("Cuestionario agregado");
});

async function addQuestionary(client, questionary){
    try {
        await client.connect();
        const result = await client.db("mydb").collection('CuestionariosPublicos').insertOne(questionary);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}