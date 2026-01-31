import type { Request, Response } from "express";
import Friend from "./friends.model.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/errors.js";
import { getReceiversSocketId, io } from "../../lib/socket.js";
import { success } from "../../utils/response.js";
import User from "../user/user.model.js";
import { Types } from "mongoose";

// Sending a Request ---
export const sendingRequest = async (req: Request, res: Response) => {
  const recipientId = req.params.userId;
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");
  if (!recipientId) throw new BadRequestError("Recipient ID not found");

  if (!Types.ObjectId.isValid(recipientId)) {
    throw new BadRequestError("Invalid recipient ID");
  }
  if (userId === recipientId) {
    throw new BadRequestError("You cannot send a friend request to yourself");
  }

  const recipientExists = await User.findById(recipientId);
  if (!recipientExists) {
    throw new NotFoundError("Recipient user not found");
  }

  const existingFriend = await Friend.findOne({
    $or: [
      { requester: userId, recipient: recipientId },
      { requester: recipientId, recipient: userId },
    ],
  });

  if (existingFriend) {
    throw new BadRequestError(
      "Friend request already exists or users are already connected",
    );
  }

  const newFriend = new Friend({
    requester: userId,
    recipient: recipientId,
  });

  await newFriend.save();

  const populatedFriend = await Friend.findById(newFriend._id).populate(
    "requester",
    "fullName email profilePic lastSeen createdAt",
  );

  const receiverSocketId = getReceiversSocketId(recipientId);
  console.log("Recipient ID: ", recipientId);
  console.log("Receiver Socket ID: ", receiverSocketId);
  console.log("Populated Friend Data: ", populatedFriend);

  if (receiverSocketId) {
    console.log("✅ Emitting newFriendRequest to socket:", receiverSocketId);
    io.to(receiverSocketId).emit("newFriendRequest", populatedFriend);
  } else {
    console.log("❌ Receiver is offline or socket not found");
  }

  success(res, newFriend);
};

// Accepting a Request ---
export const acceptingRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  if (!requestId) throw new NotFoundError("Request ID not found");
  if (!Types.ObjectId.isValid(requestId)) {
    throw new BadRequestError("Invalid request ID");
  }

  const friendRequest = await Friend.findById(requestId);
  if (!friendRequest)
    throw new NotFoundError("Request with given ID not found");

  if (String(friendRequest.recipient) !== userId) {
    throw new ForbiddenError("You are not allowed to accept this request");
  }

  if (friendRequest.status == "blocked") {
    throw new BadRequestError("This user is blcoked by you");
  }

  if (friendRequest.status !== "pending") {
    throw new BadRequestError("Request is not pending");
  }

  friendRequest.status = "accepted";
  await friendRequest.save();

  const user = await User.findById(userId);

  // Send via Socket io
  const receiverSocketId = getReceiversSocketId(
    String(friendRequest.requester),
  );
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("friendRequestAccepted", user?.fullName);
  }

  success(res, friendRequest);
};

// Rejecting a Request ---
export const rejectingRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  if (!requestId) throw new NotFoundError("Request ID not found");
  if (!Types.ObjectId.isValid(requestId)) {
    throw new BadRequestError("Invalid request ID");
  }

  const rejectedRequest = await Friend.findOneAndDelete({
    _id: requestId,
    recipient: userId,
    status: "pending",
  });

  if (!rejectedRequest) {
    throw new NotFoundError("Request not found or already processed");
  }

  const user = await User.findById(userId);

  // Send via Socket io
  const receiverSocketId = getReceiversSocketId(
    String(rejectedRequest.requester),
  );
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("friendRequestRejected", user?.fullName);
  }

  success(res, rejectedRequest);
};

// Cancel a Sent Request ---
export const cancelRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  if (!requestId) throw new NotFoundError("Request ID not found");
  if (!Types.ObjectId.isValid(requestId)) {
    throw new BadRequestError("Invalid request ID");
  }

  const canceledRequest = await Friend.findOneAndDelete({
    _id: requestId,
    requester: userId,
    status: "pending",
  });

  if (!canceledRequest) {
    throw new NotFoundError("Request not found or already processed");
  }

  // Send via Socket io
  const receiverSocketId = getReceiversSocketId(
    String(canceledRequest.recipient),
  );
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("cancelSentRequest", canceledRequest);
  }

  success(res, canceledRequest);
};

// Get all Mutual Friends (Suggestions) ---
export const mutualFriends = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  const relations = await Friend.find({
    $or: [{ requester: userId }, { recipient: userId }],
  });

  const excludedUserIds = new Set<string>();

  excludedUserIds.add(String(userId));

  relations.forEach((rel) => {
    excludedUserIds.add(String(rel.requester));
    excludedUserIds.add(String(rel.recipient));
  });

  const people = await User.find({
    _id: { $nin: Array.from(excludedUserIds) },
  }).select("_id fullName profilePic email lastSeen createdAt");

  success(res, people);
};

// Get all Friends ---
export const getAllFriends = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  const friends = await Friend.find({
    status: "accepted",
    $or: [{ requester: userId }, { recipient: userId }],
  }).populate(
    "requester recipient",
    "fullName profilePic email lastSeen createdAt",
  );

  const friendUsers = friends.map((f) => {
    const isRequester = String(f.requester._id) === userId;
    return isRequester ? f.recipient : f.requester;
  });

  success(res, friendUsers);
};

// Get all Sent Requests ---
export const sentRequests = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  const sentRequests = await Friend.find({
    requester: userId,
    status: "pending",
  }).populate("recipient", "fullName profilePic email lastSeen createdAt");

  success(res, sentRequests);
};

// Get all Incoming Requests ---
export const incomingRequests = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError("User not authenticated");

  const pendingRequests = await Friend.find({
    recipient: userId,
    status: "pending",
  }).populate("requester", "fullName profilePic email lastSeen createdAt");

  success(res, pendingRequests);
};
