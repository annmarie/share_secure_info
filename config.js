const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

if (process.env.NODE_ENV !== "prod" && process.env.NODE_ENV !== "ci") {
  dotenv.config({ path: path.join(__dirname, "../.env") });
}

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .optional()
      .default("development"),    
    CACHE_EXPIRATION: Joi.number()
      .positive()
      .integer()
      .required(),
    REDIS_HOST: Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  cacheExpiration: envVars.CACHE_EXPIRATION,
  redisHost: envVars.REDIS_HOST
};
