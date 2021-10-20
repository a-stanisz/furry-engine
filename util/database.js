const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  {
    database: 'test',
    username: process.env.DB_LOCALUSER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_LOCALHOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);

module.exports = sequelize;