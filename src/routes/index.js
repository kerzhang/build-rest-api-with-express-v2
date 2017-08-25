var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Review = require('../models/review');
var Course = require('../models/course');
var mid = require('../middleware');
var auth = require('basic-auth');

// GET authenticated users
router
  .route('/api/users')
  .get(mid.requiresSignIn, function(req, res, next) {
    var credentials = auth(req);
    User.authenticate(credentials.name, credentials.pass, function(
      error,
      user
    ) {
      if (error) {
        return next(error);
      } else {
        // console.log(user);
        res.status(200);
        return res.send(user);
      }
    });
  })
  .post(function(req, res, next) {
    if (req.body.emailAddress && req.body.fullName && req.body.password) {
      // create object with form input
      var userData = {
        emailAddress: req.body.emailAddress,
        fullName: req.body.fullName,
        password: req.body.password
      };

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function(error, user) {
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
router
  .route('/api/courses/:courseId')
  .get(function(req, res, next) {
    Course.findOne({ _id: req.params.courseId })
      .populate('reviews')
      .populate('user', 'fullName')
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
    Course.findById(req.params.courseId, function(error, course) {
      if (course) {
        //if found the course, apply the new value to the found course object.
        course.user = req.body.user;
        course.title = req.body.title;
        course.description = req.body.description;
        course.estimatedTime = req.body.estimatedTime;
        course.materialsNeeded = req.body.materialsNeeded;
        course.steps = req.body.steps;
        course.reviews = req.body.reviews;

        course.save(function(error, course) {
          if (error) {
            return next(error);
          } else {
            res.location('/');
            res.sendStatus(201);
          }
        });
      } else {
        var err = new Error('The course not found.');
        err.status = 400;
        return next(err);
      }
    });
  });

//Get courses
router
  .route('/api/courses')
  .get(mid.requiresSignIn, function(req, res, next) {
    Course.find().exec(function(error, courses) {
      if (error) {
        return next(error);
      } else {
        var courseInfo = [];
        courses.map(function(course) {
          courseInfo.push({ _id: course._id, title: course.title });
        });
        res.status(200);
        return res.send(courseInfo);
      }
    });
  })
  .post(mid.requiresSignIn, function(req, res, next) {
    if (req.body.title && req.body.description && req.body.steps) {
      // create object with form input
      var courseData = {
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        steps: req.body.steps,
        reviews: req.body.reviews
      };

      // use schema's `create` method to insert document into Mongo
      Course.create(courseData, function(error, course) {
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

//Create a review
router.post('/api/courses/:courseId/reviews', mid.requiresSignIn, function(
  req,
  res,
  next
) {

  Course.findOne({ _id: req.params.courseId })
  .populate('user', '_id')
  .exec(function(error, course) {
    // if (course.user !== req.body.user) {
      var reviewData = new Review(req.body);
    
      Review.create(reviewData, function(error, review) {
        if (error) {
          return next(error);
        } else {
          res.status(201);
          return res.location('/api/courses/'+  req.params.courseId);
        }
      });
    // } else {
    //   error = new Error('User can not review their own courses.');
    //   return next(error);
    // }
  });
  
});

// GET /
router.get('/', function(req, res, next) {
  // return res.render('index', { title: 'Home' });
  return res.send('Hello from Express!');
});

module.exports = router;
