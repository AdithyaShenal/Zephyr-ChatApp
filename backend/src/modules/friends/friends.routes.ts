import express from "express";
import auth from "../../middleware/auth.js";
import * as controller from "./friends.controller.js";

const router = express.Router();

// Sending Request
router.post("/request/:userId", auth, controller.sendingRequest);

// Accepting Request
router.post("/accept/:requestId", auth, controller.acceptingRequest);

// Rejecting Request
router.post("/reject/:requestId", auth, controller.rejectingRequest);

// Cancel Sent Request
router.post("/cancel/:requestId", auth, controller.cancelRequest);

// Get all mutual people
router.get("/mutual", auth, controller.mutualFriends);

// Get all friends
router.get("/all", auth, controller.getAllFriends);

// Get all pending Requests
router.get("/sent", auth, controller.sentRequests);

// Get all incoming Requests
router.get("/incoming", auth, controller.incomingRequests);

export default router;
