import apiPageHandler from 'middleware/api-page-handler'
import _ from 'lodash'

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