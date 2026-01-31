import mongoose, { Document, Model, Types } from "mongoose";

export interface IFriend extends Document {
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status?: "pending" | "accepted" | "blocked";
  blockedBy?: Types.ObjectId | null;
}

const friendSchema = new mongoose.Schema<IFriend>(
  {
    requester: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked"],
      default: "pending",
    },
    blockedBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

const Friend: Model<IFriend> = mongoose.model<IFriend>("Friend", friendSchema);

export default Friend;
