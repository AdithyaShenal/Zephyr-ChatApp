import { Queue } from "bullmq";
import { redis } from "../bullmqClient.js";

export const messagesQueue = new Queue("messages", {
  connection: redis,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
