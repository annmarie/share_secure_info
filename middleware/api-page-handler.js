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

const apiPageHandler = (handler) => (req, res) => {
  // assign to res object
  res.cookie = (name, value, options) => cookie(res, name, value, options)
  res.redisClient = redisClient

  return handler(req, res)
}

export default apiPageHandler;
