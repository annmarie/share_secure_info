import apiPageHandler from 'middleware/api-page-handler'

const pageRender = (req, res) => {
  req.cookie('TestCookie', 'THIS IS MY TEST COOKIE!')
  res.end(res.getHeader('Set-Cookie'))
}

export default apiPageHandler(pageRender)