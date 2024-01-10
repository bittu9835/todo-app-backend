const dotenv = require('dotenv');
dotenv.config();

const { APP_PORT, DB_HOST, DB_NAME, JWT_SECRET } = process.env;

const ENV = { ...process.env, ...{ APP_PORT, DB_HOST, DB_NAME, JWT_SECRET } };

module.exports = { ENV };
