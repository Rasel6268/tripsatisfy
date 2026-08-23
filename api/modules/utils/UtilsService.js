const uAPI = require('uapi-json');
const config = require('../uAPIConfig');

const UtilsService = uAPI.createUtilsService(
  {
    auth: config,
    debug: 0,
    production: true,
  }
)

module.exports = UtilsService;