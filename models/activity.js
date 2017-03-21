const Sequelize = require('sequelize');
const db = require('./_db');

const Act = db.define('activity', {
	name: Sequelize.STRING,
	age_range: Sequelize.STRING
})

module.exports = Act;