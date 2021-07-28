const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}









// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;