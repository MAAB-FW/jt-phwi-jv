import { Db, MongoClient, ServerApiVersion } from "mongodb";

let db: Db;

export const connectDB = async (): Promise<Db> => {
  if (db) return db;
  try {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("nihongo-nexus");
    return db;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");
  }
};
