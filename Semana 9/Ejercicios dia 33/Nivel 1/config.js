const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const envPath = path.resolve(__dirname, `.env.${env}`);
dotenv.config({ path: envPath });

module.exports = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  nodeEnv: process.env.NODE_ENV
};
