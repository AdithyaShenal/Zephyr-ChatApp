import { io, Socket } from "socket.io-client";
import { resetListeners } from "./socketListeners";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (socket?.connected) {
    console.log("Socket already connected");
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  console.log("Creating socket connection");
  socket = io({
    path: "/socket.io",
    query: { userId },
    transports: ["websocket", "polling"],
  });
  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    resetListeners();
  }
};

export const getSocket = () => socket;
