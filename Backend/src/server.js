import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import userRoutes from "./routes/User.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import "./middlewares/passport.js";

// 🔥 New imports
import http from "http";
import { Server } from "socket.io";

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

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/auth", googleAuthRoutes);

app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage by Anshu</h1>`);
});

// ✅ Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Socket.IO logic
const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userName) => {
    users[userName] = socket.id;
    console.log(`Registered ${userName} with socket ID ${socket.id}`);
  });

  socket.on("private_message", ({ to, from, text }) => {
    const receiverSocketId = users[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", { text, from });
    }
  });

  socket.on("disconnect", () => {
    for (const [name, id] of Object.entries(users)) {
      if (id === socket.id) {
        delete users[name];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});



// for payment gateway

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


// Start the server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`🚀 Server Started Successfully at http://localhost:${PORT}`);
});
