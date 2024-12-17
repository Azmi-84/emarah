import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    throw new Error("MONGODB_URI is required to connect to the database.");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Successfully connected to the database.");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed.");
  }
}

export default dbConnect;
