import { serialize } from 'cookie'
import redis from 'redis'

// middleware redisClient
const redisClient = redis.createClient();
redisClient.on('connect', function() { console.log('redis connected!') });

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

const pageHandler = (handler) => (req, res) => {
  // assign to res object
  res.cookie = (name, value, options) => cookie(res, name, value, options)
  res.redisClient = redisClient

  return handler(req, res)
}

export default pageHandler;
