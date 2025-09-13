import express from "express";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,   // frontend on Render
  "http://localhost:5173"     // local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// your routes here
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1/user", userRoutes);

export default app;
