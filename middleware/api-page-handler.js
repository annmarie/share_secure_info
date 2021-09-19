import { serialize } from 'cookie'
import _ from 'lodash'
import redis from 'redis'

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

// middleware cookie function
const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

const apiPageHandler = (handler) => (req, res) => {
  // assign to res object
  res.cookie = (name, value, options) => cookie(res, name, value, options)
  res.redisClient = redisClient

  return handler(req, res)
}

export default apiPageHandler;
