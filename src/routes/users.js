var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');
var auth = require('basic-auth');

// GET authenticated users
router
  .route('/')
  .get(mid.requiresSignIn, function(req, res, next) {
    // console.log(res.locals.currentUser);
    res.status(200);
    return res.send(res.locals.currentUser);
    //   }
    // });
  })
  .post(function(req, res, next) {
    
      User.findOne({emailAddress:req.body.emailAddress})
          .exec(function (error, user) {
            if (user) {
              var err = new Error();
              err.message = 'eMail already exist.';
              err.status = 400;
              return next(err);
            } else {
              // create object with form input
              var userData = {
                emailAddress: req.body.emailAddress,
                fullName: req.body.fullName,
                password: req.body.password
              };

              // use schema's `create` method to insert document into Mongo
              User.create(userData, function(error, user) {
                if (error) {
                  // return next(JSON.stringify(error));
                  return next(error);
                } else {
                  res.location('/');
                  res.sendStatus(201);
                }
              });
            }
          });

  });

module.exports = router;
