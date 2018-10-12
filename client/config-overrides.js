/* eslint-disable */
const rewireEslint = require('react-app-rewire-eslint');

module.exports = function override(config, env) {
  let rewiredConfig = config;
  rewiredConfig = rewireEslint(config, env);
  return rewiredConfig;
};
