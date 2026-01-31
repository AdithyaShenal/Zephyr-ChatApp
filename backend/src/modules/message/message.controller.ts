import type { Request, Response } from "express";
import User from "../user/user.model.js";
import Message from "./message.model.js";
import { success } from "../../utils/response.js";
import { BadRequestError } from "../../errors/errors.js";
import { Types } from "mongoose";
import cloudinary from "../../utils/cloudinaryClient.js";
import { getReceiversSocketId, io } from "../../lib/socket.js";
import { MessagesProducer } from "../../lib/queues/messages.producer.js";
import * as redis from "../../lib/cache.js";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const cached = await redis.cacheGet(`friends:${userId}`);
  if (cached) {
    console.log(`Cache hit -> friends:${userId}`);
    return success(res, cached);
  }

  const users = await User.find({ _id: { $ne: userId } }).select("-password");

  await redis.cacheSet(`friends:${userId}`, users, 900);

  success(res, users);
};

export const getMessages = async (req: Request, res: Response) => {
  const { id: otherUserId } = req.params;
  const userId = req.user?.userId;

  // There should be Zod schema
  if (!otherUserId) throw new BadRequestError("Coversation ID missing");

  // const cached = await redis.cacheGet(`messages:${otherUserId}:${userId}`);
  // if (cached) {
  //   console.log("Cache hit -> messages");
  //   return success(res, cached);
  // }

  const messages = await Message.find({
    $or: [
      {
        senderId: new Types.ObjectId(userId),
        receiverId: new Types.ObjectId(otherUserId),
      },
      {
        senderId: new Types.ObjectId(otherUserId),
        receiverId: new Types.ObjectId(userId),
      },
    ],
  });

  // await redis.cacheSet(`messages:${otherUserId}:${userId}`, messages, 300);

  success(res, messages);
};

export const sendMessage = async (req: Request, res: Response) => {
  const { text, image } = req.body;
  const userId = req.user?.userId;
  const { id: receiverId } = req.params;

  //There should be a zod schema.
  if (!userId) throw new BadRequestError("Unauthorized");
  if (!receiverId) throw new BadRequestError("No Receiver Id found");

  let imageUrl;

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId: userId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  // Socket emit
  const receiverSocketId = getReceiversSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  // RECEIVER conversation (unread) - Queued
  await MessagesProducer.updateUnread({
    userId: receiverId,
    chatUserId: userId,
    text: text,
  });

  // SENDER conversation (already read) - Queued
  await MessagesProducer.updateUnread({
    userId: userId,
    chatUserId: receiverId,
    text: text,
  });

  success(res, newMessage);
};
