const redis = require("redis");
const { promisify } = require("util");
const logger = require("./logger");
const config = require("./config");

const redisClient = redis.createClient(config.redisPort, config.redisHost);
const redisKeyPrefix = "share-secure-info";

redisClient.on("err", err => {
  logger.error(`redis error: ${err}`);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.setex).bind(redisClient);

const asyncSetValue = (id, value) => {
  const key = `${redisKeyPrefix}-${id}`; 
  const doc = {
      value: value,
      status: 'Current'
  }
  redisSetAsync(key, config.cacheExpiration, doc);
};

const asyncGetValue = id => {
    const key = `${redisKeyPrefix}-${id}`;
    const val = await redisGetAsync(key);
    const invalidated = {
        value: '',
        status: 'Consumed'
    }
    redisSetAsync(key, config.cacheExpiration, invalidated);
    return val;
};

module.exports = {
  setValue: asyncSetValue,
  getValue: asyncGetValue,
};
