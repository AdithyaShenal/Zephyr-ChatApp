import type { Request, Response } from "express";
import { NotFoundError } from "../../errors/errors.js";
import cloudinary from "../../utils/cloudinaryClient.js";
import User from "./user.model.js";
import { success } from "../../utils/response.js";

export const me = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const user = await User.findById(userId).select("-password -__v -updatedAt");
  if (!user) throw new NotFoundError("User with give ID not found");

  success(res, user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { profilePic } = req.body;
  if (!profilePic) throw new NotFoundError("Profile picture is required");

  const userId = req.user?.userId;

  const uploadResponse = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        profilePic: uploadResponse.secure_url,
      },
    },
    { new: true }
  );

  success(res, updatedUser, "Profile pictute updated successfully");
};
