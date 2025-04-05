import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import express from "express"

import userRoutes from "./routes/User.js";

//const express = require("express");
const app = express();
dotenv.config({
    path: './env'
})

//Db connection call
connectDB()

//Middleware 
app.use(express.json());
//app.use(cookieParser());

//load config from env file
const PORT = process.env.PORT || 7000;

//mount the API Routes
app.use("/api/v1/auth", userRoutes);

//start server
app.listen(PORT, () => {
    console.log(`Server Started Successfuly at, ${PORT}`);
})

//default route
app.get("/", (req, res) => {
    res.send(`<h1> This is HOMEPAGE Aman poddar</h1>`);
})
