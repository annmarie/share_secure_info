import apiPageHandler from 'middleware/api-page-handler'
import {getValue, setValue } from '../../utils/redisApi'
import _ from 'lodash'

// // TODO: move this to it's own file under utils
// const connectRedis = () => {
//   const host = process.env.REDIS_HOST || 'localhost'
//   const port = process.env.REDIS_PORT || '6379'
//   const password = process.env.REDIS_PASSWORD
//   const config = (password) ? { host, port, password } : { host, port }
//   const client = redis.createClient(config)
//   return client.on('connect', function () {
//     console.log(`redis connected ${host}:${port}`)
//   })
// }
// const redisClient = connectRedis()
// const redisKeyPrefix = 'MYREDISKEY'

async function requestHandler(_req, res) {
  if(_req.method === 'POST'){
  const output = { status: "start" }
  // save stuff to redis
  const setId = await setValue(_req.body.msg)

  const data = await getValue(setId)

  _.set(output, 'data', data)
  // render page
  res.status(200).json(output)
  } else if(_req.method === 'GET') {

    // retrieve link goes here
    res.status(200).json({msg:false})
  }
}

export default apiPageHandler(requestHandler);