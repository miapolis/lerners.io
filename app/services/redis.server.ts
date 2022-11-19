import type { RedisOptions } from "ioredis";
import Redis from "ioredis";
import { redisOptions } from "~/config/redis.config";
import { assertEnv } from "~/utils/env.server";

class ResourceCacheSingleton {
  private static instance: ResourceCacheSingleton;

  public readonly redis: Redis;

  private constructor(options?: string | any) {
    if (!options) {
      throw new Error("Must specify options");
    }
    this.redis = new Redis(options);
  }

  public static getCache(
    options?: string | RedisOptions
  ): ResourceCacheSingleton {
    if (!ResourceCacheSingleton.instance && !options) {
      throw new Error("Redis options are required");
    } else if (!ResourceCacheSingleton.instance) {
      ResourceCacheSingleton.instance = new ResourceCacheSingleton(options);
    }
    return ResourceCacheSingleton.instance;
  }
}

let cache: ResourceCacheSingleton;

declare namespace global {
  let globalCache: ResourceCacheSingleton;
}

if (process.env.NODE_ENV == "production") {
  cache = ResourceCacheSingleton.getCache(assertEnv("REDIS_URL"));
} else {
  if (!global.globalCache) {
    global.globalCache = ResourceCacheSingleton.getCache(redisOptions);
  }
  cache = global.globalCache;
}

export { cache };
