import pageHandler from 'utils/page-handler'

function pageRender(req, res) {
  const name = _.get('req', 'query.name', 'There')
  res.status(200).json({ greeting: `Hello ${name}!` })
}

export default pageHandler(pageRender); 
