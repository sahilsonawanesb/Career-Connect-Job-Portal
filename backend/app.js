import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL,  // Render frontend
  "http://localhost:5173"    // local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// your routes here
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

export default app;
