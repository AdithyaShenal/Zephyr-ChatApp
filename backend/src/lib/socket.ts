import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);

interface UserSocketMap {
  [userId: string]: string;
}
const userSocketMap: UserSocketMap = {}; // { userId: socketId}

export const io = new Server(server, {
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("User mapped: ", userId, socket.id);
  }

  // io.emit() => used to send events to all the connected clients.
  // io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected ", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }
  });
});

export const getReceiversSocketId = (userId: string) => {
  return userSocketMap[userId];
};
