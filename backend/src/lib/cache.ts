import { getRedisClient } from "./redis.js";

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  const redis = getRedisClient();
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const cacheSet = async (key: string, value: unknown, ttl = 60) => {
  const redis = getRedisClient();
  await redis.set(key, JSON.stringify(value), { EX: ttl });
};

export const cacheDel = async (key: string) => {
  const redis = getRedisClient();
  console.log("Cache Key Deleted", key);
  await redis.del(key);
};
