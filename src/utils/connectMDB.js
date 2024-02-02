import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}.9nb6kjf.mongodb.net`;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let db;
let isConnected = false; // flag to indicate connection is established

async function connectDatabase() {
	try {
		if (!isConnected) {
			await client.connect();
			console.log("Connected to MongoDB database");
			db = client.db("restaurant");
			isConnected = true;
		}
		return db;
	} catch (error) {
		console.error("Error connecting to database:", error);
	}
}

async function closeDatabase() {
	try {
		if (isConnected) {
			await client.close();
			console.log("Closed MongoDB database connection");
			isConnected = false;
		}
	} catch (error) {
		console.error("Error closing database connection:", error);
	}
}

export { connectDatabase, closeDatabase };
