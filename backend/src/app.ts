import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import messageRoutes from "./modules/message/message.routes.js";
import conversationRoutes from "./modules/conversations/conversation.routes.js";
import error from "./middleware/error.js";
import morgan from "morgan";
import { app, server } from "./lib/socket.js";

import dotenv from "dotenv";
dotenv.config();

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/WINDTALK_DB")
  .then(() => {
    console.log("Successfully Connected to mongoDB");
  })
  .catch((err) => console.log(err));

// Middleware
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);

// Error Middleware
app.use(error);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
