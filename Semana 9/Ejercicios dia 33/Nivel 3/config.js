const config = require('config');

module.exports = {
  port: config.get('port'),
  dbUri: config.get('dbUri'),
  envName: config.get('envName')
};
