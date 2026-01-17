import type { Request, Response } from "express";
import User from "../user/user.model.js";
import Message from "./message.model.js";
import { success } from "../../utils/response.js";
import { BadRequestError } from "../../errors/errors.js";
import { Types } from "mongoose";
import cloudinary from "../../utils/cloudinaryClient.js";
import { getReceiversSocketId, io } from "../../lib/socket.js";
import Conversation from "../conversations/conversation.model.js";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const users = await User.find({ _id: { $ne: userId } }).select("-password");

  success(res, users);
};

export const getMessages = async (req: Request, res: Response) => {
  const { id: otherUserId } = req.params;

  // There should be Zod schema
  if (!otherUserId) throw new BadRequestError("Coversation ID missing");

  const userId = req.user?.userId;

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

  // For this use Job queue -----------------------
  // RECEIVER conversation (unread)
  await Conversation.findOneAndUpdate(
    {
      userId: receiverId,
      chatUserId: userId,
    },
    {
      $set: {
        lastMessage: text,
        visited: false,
        time: Date.now(),
      },
    },
    { upsert: true }
  );

  // SENDER conversation (already read)
  await Conversation.findOneAndUpdate(
    {
      userId: userId,
      chatUserId: receiverId,
    },
    {
      $set: {
        lastMessage: text,
        visited: true,
        time: Date.now(),
      },
    },
    { upsert: true }
  );
  // ----------------------------------------------

  success(res, newMessage);
};
