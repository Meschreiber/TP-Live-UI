const Sequelize = require('sequelize');
const db = require('./_db');

const Hotel = db.define('hotel', {
	name: Sequelize.STRING,
	num_stars: Sequelize.FLOAT,
	amenities: Sequelize.STRING
})

module.exports = Hotel;