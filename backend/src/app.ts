import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import messageRoutes from "./modules/message/message.routes.js";
import conversationRoutes from "./modules/conversations/conversation.routes.js";
import friendsRoutes from "./modules/friends/friends.routes.js";

import error from "./middleware/error.js";
import morgan from "morgan";
import { app, server } from "./lib/socket.js";

import { env } from "./utils/env.js";
import dotenv from "dotenv";
import { initRedis } from "./lib/redis.js";
dotenv.config();

// Worker
import "./lib/worker/messages.worker.js";

// Database Connection
mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("Successfully Connected to MonogoDB Atlas Cluster-Zephyr_DB");
  })
  .catch((err) => console.log(err));

// Middleware
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/friends", friendsRoutes);

// Error Middleware
app.use(error);

const startup = async () => {
  const PORT = env.PORT;

  try {
    await initRedis();
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed", err);
    process.exit(1);
  }
};

startup();
