require('dotenv').config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, TIMEZONE } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    timezone: TIMEZONE,
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    timezone: TIMEZONE,
    logging: false,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    timezone: TIMEZONE,
    logging: false,
  },
};
