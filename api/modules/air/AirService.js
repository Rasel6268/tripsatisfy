const fs = require('fs');
const path = require('path');
const uAPI = require('uapi-json');
const config = require('../uAPIConfig')
const Options = {
  logFunction : (...args) => {
   const logFilePath = path.join(__dirname, 'air.log');
   const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
   const logEntry = `[${new Date().toISOString()}] ${args} \n`;
  logStream.write(logEntry);
  }
 };
const AirService = uAPI.createAirService(
  {
    auth: config,
    debug: 1,
    production: true, // If want development mode on, just say false 
    options:Options
  }
)

module.exports = AirService;