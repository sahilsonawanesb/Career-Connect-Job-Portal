import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());



app.use(cookieParser());



const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Handle preflight requests
app.options("*", cors());


// your routes here
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1/user", userRoutes);

export default app;
