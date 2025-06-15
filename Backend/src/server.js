import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import Message from "./models/Message.js";
// Routes
import userRoutes from "./routes/User.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import recurringBillsRoutes from "./routes/RecurringBills.js";
import updateProfileRoutes from "./routes/Profile.js";
import transactionRoutes from "./routes/Transaction.js";
import categoryRoutes from "./routes/Category.js";
import friendRoutes from "./routes/FriendRequest.js";
import debtRoutes from "./routes/Debt.js";
import savingRoutes from "./routes/Savings.js";
import groupRoutes from "./routes/Group.js";
import messageRoutes from "./routes/Message.js"
// Passport config
import "./middlewares/passport.js";

// Environment setup
dotenv.config({ path: "./.env" });

// Express App Setup
const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

// Session and Passport setup
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route registration
app.use("/api/v1/auth", userRoutes);
app.use("/auth", googleAuthRoutes);
app.use("/api/v1/bills", recurringBillsRoutes);
app.use("/api/v1/profile", updateProfileRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/debts", debtRoutes);
app.use("/api/v1/savings", savingRoutes);
app.use("/api/v1/group", groupRoutes);
app.use("/api/v1/messages",messageRoutes);
app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage by Anshu</h1>`);
});

// Socket.IO Setup
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Register user using their _id
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`Registered user ${userId} with socket ID ${socket.id}`);
  });

  // Handle private messages
  socket.on("private_message", async ({ to, from, text }) => {
  console.log(`Message from ${from} to ${to}: ${text}`);

  // Save to MongoDB for offline persistence
  try {
    await Message.create({ from, to, text });
  } catch (err) {
    console.error("Error saving message:", err);
  }

  const receiverSocketId = users[to];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receive_message", { text, from });
  } else {
    console.log(`User ${to} not connected. Message stored.`);
  }
});
  // Clean up on disconnect
  socket.on("disconnect", () => {
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Payment Gateway (Stripe)
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  const { amount, name, reason } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Settle with ${name}`,
              description: reason,
            },
            unit_amount: Math.round(amount * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CORS_ORIGIN}/success`,
      cancel_url: `${process.env.CORS_ORIGIN}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

// Start Server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`🚀 Server Started Successfully at http://localhost:${PORT}`);
});
