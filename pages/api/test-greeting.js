import pageHandler from 'utils/page-handler'

function pageRender(req, res) {
  res.status(200).json({ greeting: 'Hello There!' })
}

export default pageHandler(pageRender); 
