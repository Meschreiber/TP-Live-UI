const Sequelize = require('sequelize');
const db = require('./_db');

const Restaurant = db.define('restaurant', {
	name: Sequelize.STRING,
	cuisine: Sequelize.STRING,
	price: Sequelize.INTEGER
})

module.exports = Restaurant;