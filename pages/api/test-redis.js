import apiPageHandler from 'middleware/api-page-handler'
import _ from 'lodash'
import redis from 'redis'
import * as uuid from 'uuid';

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
const redisKeyPrefix = 'MYREDISKEY'

const setValue = (value) => {
  const id = uuid.v4()
  const key = `${redisKeyPrefix}-${id}`; 
  const doc = {
      value: value,
      status: 'Current'
  }
  redisClient.setex(key, 123332, JSON.stringify(doc))
  return key 
}

const getValue = (id) => {
  return redisClient.get(id, (err, resp) => {
    return resp
  })
}

async function pageRender(_req, res) {
  const output = { status: "start" } 
  // save stuff to redis
  const setId = setValue('some stuff i saved in redis')

  const data = getValue(setId)

  _.set(output, 'data', data)

  // render page
  res.status(200).json(output)
}

export default apiPageHandler(pageRender); 