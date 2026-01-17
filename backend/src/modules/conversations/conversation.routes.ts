import express from "express";
import * as controller from "./conversation.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// Get conversations of a user
router.get("/", auth, controller.getConversations);

router.put("/:conversationId", auth, controller.markVisited);

export default router;
