import apiPageHandler from 'middleware/api-page-handler'
import {getSecret, setSecret } from '../../providers/secretProvider'
import _ from 'lodash'

async function requestHandler(_req, res) {
  if(_req.method === 'POST'){
  const output = { status: "New" }
  // save stuff to redis
  const id = await setSecret(_req.body.msg, _req.body.expiration)

  res.status(200).json({id})
  } else if(_req.method === 'GET') {
    const val = await getSecret(_req.body.id)
    res.status(200).json({val})
  }
}

export default apiPageHandler(requestHandler);