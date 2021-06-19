// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = parseInt(process.env.PORT || '3000', 10);

const config = {
  port: process.env.PORT,
   
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
   
  api: {
    prefix: '/api',
  },

  origins: [`http://localhost:${process.env.PORT}`]
};

module.exports = config;