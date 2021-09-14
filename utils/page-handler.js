import { serialize } from 'cookie'

// middleware cookie function
const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

const pageHandler = (handler) => (req, res) => {
  // Adds `cookie` function on `res.cookie` to set cookies for response
  res.cookie = (name, value, options) => cookie(res, name, value, options)

  return handler(req, res)
}

export default pageHandler;
