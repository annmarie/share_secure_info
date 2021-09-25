const _ = require("lodash");

module.exports = (phase, { defaultConfig }) => {
  const newConfig = {
    env: {
      // set env vars
      ENCRYPTION_APP_KEY: process.env.ENCRYPTION_APP_KEY,
      phase
    },
    async rewrites() {
      return {
        fallback: [
          {
            source: "/shh/:secret",
            destination: "/secret"
          },
          {
            source: '/',
            destination: "/",
          },
        ],
      }
    },
  };

  return _.merge(defaultConfig, newConfig);
};
