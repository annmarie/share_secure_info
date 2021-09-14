import pageHandler from 'utils/page-handler'

const pageRender = (req, res) => {
  res.cookie('MYCookie', 'THIS IS MY COOKIE!')
  res.end(res.getHeader('Set-Cookie'))
}

export default pageHandler(pageRender)
