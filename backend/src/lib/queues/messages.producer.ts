import { messagesQueue } from "./messages.queue.js";

export interface UnreadUpdateProps {
  userId: string;
  chatUserId: string;
  text: string;
}

export const MessagesProducer = {
  async updateUnread(data: UnreadUpdateProps) {
    return await messagesQueue.add("update-unread", data);
  },
};

// markRead(data: MarkReadProps) {
//   return messagesQueue.add("mark-read", data);
// },

// updateLastMessage(data: LastMessageProps) {
//   return messagesQueue.add("update-last-message", data);
// },
