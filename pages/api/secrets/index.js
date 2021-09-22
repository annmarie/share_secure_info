import apiPageHandler from 'middleware/api-page-handler'
import _ from 'lodash'
import { setSecret, getSecret } from 'providers/secretProvider';

async function requestHandler(_req, res) {
  if(_req.method === 'POST'){
  const output = { status: "start" }

  let id;
  try {
    id = await setSecret(_req.body.data, _req.body.timeout);
  } catch (error) {
      console.log(error);
  }

  //const data = await getSecret(id);

  _.set(output, 'data', data)
  // render page
  res.status(200).json(output)
  } else if(_req.method === 'GET') {

    // retrieve link goes here
    res.status(200).json({msg:false})
  }
}

export default apiPageHandler(requestHandler);