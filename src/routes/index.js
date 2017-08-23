var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Review = require('../models/review');
var Course = require('../models/course');
var mid = require('../middleware');
var auth = require('basic-auth');


// GET authenticated users
router.route('/api/users')
.get(mid.requiresSignIn, function(req, res, next) {
  User.findOne().exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      console.log(user);
      res.status(200);
      return res.send(user);
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
          res.location('/');
          res.sendStatus(201);        
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

//Get course
router.route('/api/courses/:courseId')
.get(function(req, res, next) {
  Course.findOne({_id: req.params.courseId})
  .deepPopulate('user reviews')
  .exec(function(error, course) {
    if (error) {
      return next(error);
    } else {
      
      res.status(200);
      return res.send(course);
    }
  });
})
.put(mid.requiresSignIn, function(req, res, next) {
  if (req.body.title &&
    req.body.description) {

      // use schema's `create` method to insert document into Mongo
      User.create(courseData, function (error, course) {
        if (error) {
          return next(error);
        } else {
          res.location('/');
          res.sendStatus(201);        
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

//Get courses
router.route('/api/courses')
.get(function(req, res, next) {
  Course.find().exec(function(error, courses) {
    if (error) {
      return next(error);
    } else {
      let courseInfo = [];
      courses.map(function (course) {
        courseInfo.push({id: course._id, title: course.title});
      });
      res.status(200);
      return res.send(courseInfo);
    }
  });
})
.post(mid.requiresSignIn, function(req, res, next) {
  if (req.body.title &&
    req.body.description) {

      // create object with form input
      var courseData = {
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        steps: req.body.steps,
        reviews: req.body.reviews,
        
      };

      // use schema's `create` method to insert document into Mongo
      User.create(courseData, function (error, course) {
        if (error) {
          return next(error);
        } else {
        res.send(201);        
        res.location('/');
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

// GET /
router.get('/', function(req, res, next) {
  // return res.render('index', { title: 'Home' });
  return res.send('Hello from Express!');
});


module.exports = router;
