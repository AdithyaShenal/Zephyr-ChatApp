import mongoose, { Document, Model, Types } from "mongoose";

export interface IConversation extends Document {
  userId: Types.ObjectId;
  chatUserId: Types.ObjectId;
  lastMessage: string;
  time: Date;
  visited: boolean;
}

const conversationSchema = new mongoose.Schema<IConversation>({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatUserId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastMessage: {
    type: String,
    default: "No messages yet",
  },
  time: {
    type: Date,
    default: Date.now,
  },
  visited: {
    type: Boolean,
    default: false,
  },
});

const Conversation: Model<IConversation> = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
