import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/userRoute.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
connectDB();
app.use(express.json());

app.use("/api/user", userRoute);



app.listen(PORT,()=>{ 
    console.log(`Server is running on port ${PORT}`);
})