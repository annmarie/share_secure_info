const _ = require('lodash')

module.exports = (phase, { defaultConfig }) => {

  const newConfig = {
    env: { // set env vars
      phase
    },
    async rewrites() {
      return {
        fallback: [
          {
            source: '/:path',
            destination: "/",
          },
        ],
      }
    },
  };

  return _.merge(defaultConfig, newConfig); 
}