const {MongoClient} = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

app.listen(port, () => {
	console.log("App listening at http://%s:%s", host, port);
});

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const collectionName = "fakestore_catalog";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/products", async (req, res) => {
	await client.connect();
	console.log("Node connected successfully to GET MongoDB");
	const query = {};
	const results = await db
		.collection(collectionName)
		.find(query)
		.limit(100)
		.toArray();
	console.log(results);
	res.status(200);
	res.send(results);
});

