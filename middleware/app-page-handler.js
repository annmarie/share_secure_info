import appConfig from 'app-config'
import next from 'next';
import nextConnect from "next-connect";

const handler = nextConnect();

const appPageHandler = (handler) => (req, res) => {
  req.appConfig = appConfig
  return next(req, res)
}

export default appPageHandler;
