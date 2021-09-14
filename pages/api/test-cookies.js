import pageHandler from 'utils/page-handler'

const pageRender = (req, res) => {
  res.cookie('TestCookie', 'THIS IS MY TEST COOKIE!')
  res.end(res.getHeader('Set-Cookie'))
}

export default pageHandler(pageRender)
