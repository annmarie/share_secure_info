import pageHandler from 'utils/page-handler'
import appConfig from 'app-config'

const pageRender = (_req, res) => {
  const output = { ...appConfig }

  res.status(200).json(output)
}

export default pageHandler(pageRender)
