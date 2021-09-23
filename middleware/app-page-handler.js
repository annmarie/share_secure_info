import appConfig from 'app-config'
import next from 'next'

const appPageHandler = () => (req, res) => {
  req.appConfig = appConfig
  return next(req, res)
}

export default appPageHandler
