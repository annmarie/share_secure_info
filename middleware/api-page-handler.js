import _ from 'lodash'
import cookie from 'utils/cookie'

const apiPageHandler = (handler) => (req, res) => {
  // assign to res object
  req.cookie = (name, value, options) => cookie(res, name, value, options)

  return handler(req, res)
}

export default apiPageHandler;
