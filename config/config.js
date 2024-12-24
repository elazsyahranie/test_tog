require('dotenv').config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  TIMEZONE,
  DB_HOST,
  HOST_DOCKER_INTERNAL,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST_DOCKER_INTERNAL,
    port: DB_PORT,
    dialect: 'mysql',
    timezone: TIMEZONE,
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST_DOCKER_INTERNAL,
    port: DB_PORT,
    dialect: 'mysql',
    timezone: TIMEZONE,
    logging: false,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST_DOCKER_INTERNAL,
    port: DB_PORT,
    dialect: 'mysql',
    timezone: TIMEZONE,
    logging: false,
  },
};
