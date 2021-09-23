import apiPageHandler from 'middleware/api-page-handler'
import { getSecret, setSecret, removeSecret } from '../../providers/secretProvider'
import _ from 'lodash'

async function requestHandler(req, res) {
  const method = req.method
  switch (method) {
    case 'POST':
      const output = { status: "New" }
      // save stuff to redis
      const id = await setSecret(req.body.msg, req.body.expiration);
      res.status(200).json({ id })
      break
    default: 
      const val = await getSecret(req.query.id);
      await removeSecret(req.query.id);
      res.status(200).json({ val })
  }
}

export default apiPageHandler(requestHandler);