import _ from 'lodash'
import redis from 'redis'

const connectRedis = () => {
    const host = process.env.REDIS_HOST || 'localhost'
    const port = process.env.REDIS_PORT || '6379'
    const password = process.env.REDIS_PASSWORD
    const config = (password) ? { host, port, password } : { host, port }
    const client = redis.createClient(config)
    return client.on('connect', function () {
      console.log(`redis connected ${host}:${port}`)
    })
  }
  const redisClient = connectRedis()
  const redisKeyPrefix = 'MYREDISKEY'

 export default redisClient