import type { UnreadUpdateProps } from "../queues/messages.producer.js";
import Conversation from "../../modules/conversations/conversation.model.js";

export const unreadUpdateHandler = async (data: UnreadUpdateProps) => {
  const { userId, chatUserId, text } = data;

  console.log("Running Unread Update Process");
  await Conversation.findOneAndUpdate(
    { userId, chatUserId },
    {
      $set: {
        lastMessage: text,
        visited: false,
        time: Date.now(),
      },
    },
    { upsert: true },
  );
};
