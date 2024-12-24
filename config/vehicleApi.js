const Sequelize = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const { development } = require('./config');

const serviceUser = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  ...development,
});

module.exports = serviceUser;
