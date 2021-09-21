import apiPageHandler from 'middleware/api-page-handler'
import {getValue, setValue } from '../../utils/redisApi'
import _ from 'lodash'

async function pageRender(_req, res) {
  const output = { status: "start" }
  // save stuff to redis
  const setId = await setValue('refactorized')

  const data = await getValue(setId)

  _.set(output, 'data', data)

  // render page
  res.status(200).json(output)
}

export default apiPageHandler(pageRender);