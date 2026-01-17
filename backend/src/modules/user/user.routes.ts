import express from "express";
import * as controller from "./user.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// Checked - OK
router.get("/me", auth, controller.me);

// Not Checked
router.put("/update-profile", auth, controller.updateProfile);

export default router;
