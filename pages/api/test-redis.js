import apiPageHandler from 'middleware/api-page-handler'
import _ from 'lodash'

const getRedisKey = async (key, redisClient) => { 
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) reject('something went wrong')
      else resolve(reply) 
    });
  })
}

async function pageRender(req, res) {
  const output = {} 
  const key = 'MYREDISKEY'
  // save stuff to redis
  req.redisClient.set(key, 'some stuff i saved in redis')
  // get stuff from redis
  const value = await getRedisKey(key, req.redisClient)
  // delete stuff from redis 
  req.redisClient.del(key, 'some stuff i saved in redis')
  // render page
  output[key] = value
  res.status(200).json(output)
}

export default apiPageHandler(pageRender); 