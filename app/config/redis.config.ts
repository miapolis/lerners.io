import { RedisOptions } from "ioredis";
import { assertEnv } from "~/utils/env.server";

export const redisOptions: RedisOptions = {
  port:
    (process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : null) || 6379,
  family: 6,
  host: assertEnv("REDIS_HOST"),
  password: process.env.REDIS_PASSWORD || undefined,
};
