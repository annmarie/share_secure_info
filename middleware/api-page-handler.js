import _ from "lodash";
import { serialize } from "cookie";

const cookie = (res, name, value, options = {}) => {
  const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

const apiPageHandler = (handler) => (req, res) => {
  // assign to res object
  req.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};

export default apiPageHandler;
