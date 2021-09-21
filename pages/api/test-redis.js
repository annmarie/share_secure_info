import apiPageHandler from 'middleware/api-page-handler'
import _ from 'lodash'
import redis from 'redis'

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

// const redisGetAsync = promisify(redisClient.get).bind(redisClient);
// const redisSetAsync = promisify(redisClient.setex).bind(redisClient);

// const asyncSetValue = (id, value) => {
//   const key = `${redisKeyPrefix}-${id}`; 
//   const doc = {
//       value: value,
//       status: 'Current'
//   }
//   redisSetAsync(key, config.cacheExpiration, doc);
// };

// const asyncGetValue = id => {
//     const key = `${redisKeyPrefix}-${id}`;
//     const val = await redisGetAsync(key);
//     const invalidated = {
//         value: '',
//         status: 'Consumed'
//     }
//     redisSetAsync(key, config.cacheExpiration, invalidated);
//     return val;
// };

async function pageRender(req, res) {
  const output = {} 
  const key = 'MYREDISKEY'
  // save stuff to redis
  //req.redisClient.set(key, 'some stuff i saved in redis')

  // render page
  //output[key] = value
  res.status(200).json(output)
}

export default apiPageHandler(pageRender); 