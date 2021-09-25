import appConfig from "app-config";
import next from "next";
import nextConnect from "next-connect";

const appPageHandler = nextConnect();

appPageHandler.use((req, res) => {
  req.appConfig = appConfig;
  return next(req, res);
});

export default appPageHandler;
