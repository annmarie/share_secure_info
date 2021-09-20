const redis = require("redis");
const { promisify } = require("util");
const logger = require("./logger");
const config = require("./config");
const { random } = require("lodash");
const { randomUUID } = require("crypto");

const redisClient = redis.createClient(config.redisPort, config.redisHost);
const redisKeyPrefix = "share-secure-info";

redisClient.on("err", err => {
  logger.error(`redis error: ${err}`);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.setex).bind(redisClient);

export function asyncSetValue (value: string, expiration: number): string {
  const id = randomUUID;
  const key = `${redisKeyPrefix}-${id}`;

  redisSetAsync(key, expiration, value);
  return key;
};

export async function asyncGetValue (id): Promise<string> {
    const key = `${redisKeyPrefix}-${id}`;
    const val = await redisGetAsync(key);

    redisSetAsync(key, config.cacheExpiration, '');
    return val;
};

