var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var db = require('./models');
var router = require('./routes');


var app = express();

nunjucks.configure('views', {noCache:true})
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(morgan('dev'))
app.use(router);

app.use(function(err, req, res, next) {
	console.error(err)
	res.status(500)
	res.send(err, err.stack)
})

db.sync()
	.then(function(){
		console.log('db synced');
		app.listen(3000, function(){
			console.log("Listening on 3000")
		})
	})
	.catch(function(err){
		console.log("failed to sync")
		console.error(err.stack)
	})
