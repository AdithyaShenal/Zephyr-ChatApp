import { createClient, type RedisClientType } from "redis";
import { env } from "../utils/env.js";

let redisClient: RedisClientType;

const url = env.REDIS_URL;

export const initRedis = async () => {
  redisClient = createClient({ url });
  await redisClient.connect();
  console.log(`Redis cache connected: ${url}`);
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error("Redis not initialized");
  }
  return redisClient;
};
