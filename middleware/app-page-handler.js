import nextConnect from "next-connect";
const appPageHandler = nextConnect();

appPageHandler.use((req, res, next) => {
  console.log(req.url)

  console.log(next)

  return next();
})

export default appPageHandler;
