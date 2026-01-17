import type { Request, Response } from "express";
import * as schema from "./auth.validator.js";
import User, { type IUser } from "../user/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import _ from "lodash";
import { BadRequestError, ValidationError } from "../../errors/errors.js";
import { success } from "../../utils/response.js";

// Signup Controller
export const signup = async (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("Request body is Required");

  const result = schema.signupSchema.safeParse(req.body);

  if (!result.success)
    throw new ValidationError(result.error.issues[0]?.message);

  const { fullName, email, password } = result.data;

  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exists." });

  // Hash Password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser: IUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  if (!newUser) throw new BadRequestError("Error while creating user");

  await newUser.save();
  generateToken(String(newUser._id), res);

  success(res, _.pick(newUser, ["_id", "fullName", "email", "createdAt"]));
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("Request body is Required");

  const result = schema.loginSchema.safeParse(req.body);
  if (!result.success)
    throw new ValidationError(result.error.issues[0]?.message);

  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Invalid email or password");

  const isValid = await bcryptjs.compare(password, user.password);
  if (!isValid) throw new BadRequestError("Invalid email or password");

  generateToken(user.id, res);

  success(res, _.pick(user, ["_id", "fullName", "email", "createdAt"]));
};

// Logout Controller
export const logout = (req: Request, res: Response) => {
  res.cookie("authToken", "", { maxAge: 0 });

  success(res, null, "Logged out successfully");
};
