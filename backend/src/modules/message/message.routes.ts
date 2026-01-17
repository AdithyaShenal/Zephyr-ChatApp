import express from "express";
import * as controller from "./message.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.get("/users", auth, controller.getUsersForSidebar);

router.get("/:id", auth, controller.getMessages);

router.post("/send/:id", auth, controller.sendMessage);

export default router;
