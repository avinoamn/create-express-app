// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  port: parseInt(process.env.PORT || '3000', 10),
   
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
   
  api: {
    prefix: '/api',
  },
};

module.exports = config;