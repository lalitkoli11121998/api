var logger = require('./config/winston');

let host = `${process.env.ip}:${process.env.port}`;
logger.info("env: "+`${process.env.name}`);
if("stage" == `${process.env.name}` || "prod" == `${process.env.name}`|| "development" == `${process.env.name}`){
  host = `${process.env.ip}`;
}

module.exports = {
  info: {
    // API informations (required)
    title: 'API for Flights', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'API for Flights', // Description (optional)
  },
  host, // Host (optional)
  basePath: '/', // Base path (optional)
};
