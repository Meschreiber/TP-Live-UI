var Promise = require('bluebird');
var router = require('express').Router();

var db = require('../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');

router.get('/', function(req, res, next) {
	Promise.all([
		Hotel.findAll(),
		Restaurant.findAll(),
		Activity.findAll()
	])
	.spread(function(hotels, restaurants, activities) {
		res.render('index', {
			hotels: hotels,
			restaurants: restaurants,
			activities: activities
		})
	})
	.catch(next)
})

module.exports = router;