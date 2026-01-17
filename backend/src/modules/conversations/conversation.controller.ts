import type { Request, Response } from "express";
import Conversation from "./conversation.model.js";
import { success } from "../../utils/response.js";
import { ValidationError } from "../../errors/errors.js";

// [
//   {
//     _id: "conv123",
//     lastMessage: "Hey",
//     visited: false,
//     chatUserId: {
//       _id: "user456",
//       fullName: "John Doe",
//       profilePic: "https://...",
//       lastSeen: "2026-01-12T10:20:00.000Z",
//     },
//     time: "2026-01-12T10:21:00.000Z",
//   },
// ];

export const getConversations = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new ValidationError("Unauthorized");
  }

  const conversations = await Conversation.find({ userId })
    .populate({
      path: "chatUserId",
      select: "fullName profilePic lastSeen email createdAt",
    })
    .sort({ updatedAt: -1 });

  success(res, conversations);
};

export const markVisited = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;

  const userId = req.user?.userId;

  if (!userId) {
    throw new ValidationError("Unauthorized");
  }

  if (!conversationId) throw new ValidationError("No conversation id found");

  const updatedConv = await Conversation.findOneAndUpdate(
    {
      _id: conversationId,
      userId,
    },
    { $set: { visited: true } },
    { new: true }
  );

  if (!updatedConv) {
    throw new ValidationError("Conversation not found");
  }

  success(res, updatedConv);
};
