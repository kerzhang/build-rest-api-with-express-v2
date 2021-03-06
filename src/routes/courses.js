var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var Course = require('../models/course');
var mid = require('../middleware');
var auth = require('basic-auth');

//Get course
router
  .route('/:courseId')
  .get(function(req, res, next) {
    Course.findOne({ _id: req.params.courseId })
      .populate('reviews')
      .populate('user', 'fullName')
      .exec(function(error, course) {
        if (error) {
          return next(error);
        } else if (!course){
          error = new Error('Course not found.');
          res.status(404);
          error.status = 404;
          return next(error);
        } else {
          res.status(200);
          console.log(course.title);
          return res.send(course);
        }
      });
  })
  .put(mid.requiresSignIn, function(req, res, next) {
    Course.findById(req.params.courseId, function(error, course) {
      if (course) {
        //if found the course, apply the new value to the found course object.
        course.user = res.locals.currentUser._id;
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
            res.sendStatus(204);
          }
        });
      } else {
        var err = new Error('The course not found.');
        err.status = 400;
        return next(err);
      }
    });
  })
  .delete(mid.requiresSignIn, function(req, res, next) {
    Course.remove({_id: req.params.courseId}, function(error, result) {
      if(error) {
        return next(error);
      } else {

        return res.sendStatus(200);
      }
    });
  });

//Get courses
router
  .route('/')
  .get(function(req, res, next) {
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
  });

//Create a review
router.post('/:courseId/reviews', 
            mid.requiresSignIn, 
            function(req, res, next) {
              // console.log(req.params.courseId);
  Course.findOne({ _id: req.params.courseId })
    .exec(function(error, course) {
      if (course) {
        console.log(course.title);
        // console.log(typeof(res.locals.currentUser._id));

        // the type of both user's _id are 'Object', convert them to string before comparing.
        if (course.user.toString() === res.locals.currentUser._id.toString()) {
          error = new Error();
          error.message = 'Users can not review their own courses.';
          error.status = 400;
          return next(error);
        } else {
          var reviewData = new Review(req.body);
          console.log(reviewData);
          Review.create(reviewData, function(error, review) {
            if (error) {
              return next(error);
            } else {
              course.reviews.push(review._id);
              course.save(function (error, course) {
                if(error){
                  return next(error);
                }
              });
              res.location('/api/courses/' + req.params.courseId);
              return res.sendStatus(201);
            }
          });
        }
      } else {
        error = new Error('Course was not found.');
        res.status(404);
        error.status = 404;
        return next(error);
      }
    });
});

module.exports = router;
