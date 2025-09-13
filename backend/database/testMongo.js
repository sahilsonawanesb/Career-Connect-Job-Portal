import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("MONGO_URI:", process.env.MONGO_URI); // debug

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas connection successful!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB Atlas connection failed:", err.message);
    process.exit(1);
  }
};

testConnection();
