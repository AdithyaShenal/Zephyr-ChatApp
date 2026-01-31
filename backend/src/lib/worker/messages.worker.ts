import { Worker } from "bullmq";
import { redis } from "../bullmqClient.js";
import { unreadUpdateHandler } from "./unreadUpdate.handler.js";

export const messagesWorker = new Worker(
  "messages",
  async (job) => {
    if (job.name === "update-unread") {
      await unreadUpdateHandler(job.data);
    }
    // If there any other job goes here =>
  },
  {
    connection: redis,
  },
);
