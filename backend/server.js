import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();

// Allow your frontend domain
app.use(cors({
  origin: "https://career-connect-job-portal-frontend1.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
