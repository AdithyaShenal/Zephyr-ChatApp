import express from "express";
import * as controller from "./auth.controller.js";

const router = express.Router();

// Checked - OK
router.post("/signup", controller.signup);

// Checked - OK
router.post("/login", controller.login);

// Checked - OK
router.post("/logout", controller.logout);

export default router;
