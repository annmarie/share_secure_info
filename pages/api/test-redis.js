import apiPageHandler from 'middleware/api-page-handler'
import {getValue, setValue } from '../../utils/redisApi'
import _ from 'lodash'


async function requestHandler(_req, res) {
  if(_req.method === 'POST'){
  const output = { status: "start" }
  // save stuff to redis
  const setId = await setValue('refactorized')


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