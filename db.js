import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongourl = process.env.mongourl;

async function createConnection(){
    const client = new MongoClient(mongourl);
    await client.connect();
    console.log("MongoDB Connected Successfully");
    return client;
}
export const objectId = ObjectId;
export const client = await createConnection();