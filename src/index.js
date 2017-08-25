'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
// var session = require('express-session');
var bodyParser = require('body-parser');
var seeder = require('mongoose-seeder');

var data = require('./data/data.json');

var app = express();

// mongodb connection
// mongoose.connect('mongodb://cooboor:@ds028540.mlab.com:28540/cooboormongodb', {
mongoose.connect('mongodb://localhost:27017/courserate', {
  useMongoClient: true,
})
.then(function(db){

  console.log('== Mongodb Connection established! ==');
  seeder
    .seed(data, { dropDatabase: true })
    .then(function(dbData) {
      console.log('data has been restored');
    });
})    
.catch(function(err) {
  console.error('Error returned while connecting DB: ' + err.message);
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message);
  console.log(err + ':' + err.message);
});
// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});

//This is for testing
module.exports = app;