const _ = require('lodash')

module.exports = (phase, { defaultConfig }) => {

  const newConfig = {
    env: { // set env vars
      phase
    },
  };

  return _.merge(defaultConfig, newConfig); 
}