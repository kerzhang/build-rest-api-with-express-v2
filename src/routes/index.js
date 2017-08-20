var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Review = require('../models/review');
var Course = require('../models/course');
var mid = require('../middleware');

// GET /profile
router.route('/api/users')
.get(function(req, res, next) {
  User.find().exec(function(error, users) {
    if (error) {
      return next(error);
    } else {
      console.log(users);
      return res.send(users);
    }
  });
})
.post(function(req, res, next) {
  if (req.body.emailAddress &&
    req.body.fullName &&
    req.body.password) {

      // create object with form input
      var userData = {
        emailAddress: req.body.emailAddress,
        fullName: req.body.fullName,
        password: req.body.password
      };

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
        //   req.session.userId = user._id;
        //   return res.redirect('/profile');
        window.location.href = '/';
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

// GET /
router.get('/', function(req, res, next) {
  // return res.render('index', { title: 'Home' });
  return res.send('Hello from Express!');
});


module.exports = router;
