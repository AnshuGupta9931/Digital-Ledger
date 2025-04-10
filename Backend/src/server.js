import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import userRoutes from "./routes/User.js"

const app = express();

dotenv.config({
    path: './.env'
})

//DB Connection
connectDB()

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//load config from env file
const PORT = process.env.PORT || 7000;

//Routes
app.use("/api/v1/auth", userRoutes);

//Default Route
app.get("/", (req, res) => {
    res.send(`<h1>This is Homepage by Anshu</h1>`)
})

//Start Server
app.listen(PORT, () => {
    console.log(`Server Started Successfully at ${PORT}`)
})
