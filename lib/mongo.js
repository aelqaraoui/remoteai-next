import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export async function connectToDatabase() {
    try {
        if (!client) {
          client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
          await client.connect();
        }
        const db = client.db("AUTH");
        return { db, client };
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e;
    }
}

export async function getUserByEmail(email) {
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ email });
  return user;
}

export async function createUser(user) {
  const { db } = await connectToDatabase();
  const result = await db.collection("users").insertOne(user);
  return result;
}

export async function userExists(email) {
    const { db } = await connectToDatabase();
    const existingUser = await db.collection("users").findOne({ email });
    return !!existingUser;
}

export async function createProfile(profile) {
    const { db } = await connectToDatabase();
    const result = await db.collection("profiles").insertOne(profile);
    return result;
}

export async function getProfile(email) {
    const { db } = await connectToDatabase();
    const result = await db.collection("profiles").findOne({ email });
    return result;
}

export async function recordApply(email, jobUrl) {
    const { db } = await connectToDatabase();
    const result = await db.collection("profiles")
    .findOneAndUpdate(
        { email },
        { $addToSet: { applications: jobUrl } },
        { new: false }
    );
    return result;
}

export async function recordExpand(email, jobUrl) {
    const { db } = await connectToDatabase();
    const result = await db.collection("profiles")
    .findOneAndUpdate(
        { email },
        { $addToSet: { expands: jobUrl } },
        { new: false }
    );
    return result;
}