import _ from 'lodash'
import redis from 'redis'
import cookie from 'utils/cookie'

// TODO: move this to it's own file under utils
const connectRedis = () => {
  const host = process.env.REDIS_HOST || 'localhost'
  const port = process.env.REDIS_PORT || '6379'
  const password = process.env.REDIS_PASSWORD
  const config = (password) ? { host, port, password } : { host, port }
  const client = redis.createClient(config)
  return client.on('connect', function() {
    console.log(`redis connected ${host}:${port}`)
  })
}
const redisClient = connectRedis()

const setRedisValue = (id, value) => {
  const key = `${redisKeyPrefix}-${id}`; 
  const doc = {
      value: value,
      status: 'Current'
  }
  redisClient.get(key, config.cacheExpiration, doc);
};

const getRedisValue = id => {
    const key = `${redisKeyPrefix}-${id}`;
    const val = await redisGetAsync(key);
    const invalidated = {
        value: '',
        status: 'Consumed'
    }
    redisClient.setex(key, config.cacheExpiration, invalidated);
    return val;
};

const apiPageHandler = (handler) => (req, res) => {
  // assign to res object
  rep.cookie = (name, value, options) => cookie(res, name, value, options)
  rep.redisClient = redisClient

  return handler(req, res)
}

export default apiPageHandler;
