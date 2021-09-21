const redis = require("redis");
const { promisify } = require("util");
const { randomUUID } = require("crypto");

const host = process.env.REDIS_HOST || 'localhost'
const port = process.env.REDIS_PORT || '6379'
const password = process.env.REDIS_PASSWORD
const config = (password) ? { host, port, password } : { host, port }
const redisClient = redis.createClient(config);

const redisKeyPrefix = "share-secure-info";

redisClient.on("err", err => {
  logger.error(`redis error: ${err}`);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.setex).bind(redisClient);

const asyncSetValue = (value, expiration) => {
  const id = randomUUID;
  const key = `${redisKeyPrefix}-${id}`;

  redisSetAsync(key, expiration, value);
  return key;
};

const asyncGetValue = async (id) => {
    const key = `${redisKeyPrefix}-${id}`;
    const val = await redisGetAsync(key);

    redisSetAsync(key, '');
    return val;
};

module.exports = {
  setValue: asyncSetValue,
  getValue: asyncGetValue,
};
