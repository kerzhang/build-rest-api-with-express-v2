// var mongoose = require('mongoose');
// var Review = require('../src/models/review.js');

// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var server = require('../src/index');
// var should = chai.should();
var expect = require('chai').expect;
var request = require('supertest');

// chai.use(chaiHttp);

describe('Review Test', function() {

  // before(function(done) {
  //   Review.remove({}, function(err) {
  //     if(err) console.log(err);
  //   });
  //   done();
  // });

  describe('POST review function', function() {
    it('it should return error when user review their owner course ==>', function(done) {
      //create a new user object
      var review = {
        rating: 1
      };

      // chai
      request('localhost:5000')
          .post('/api/courses/57029ed4795118be119cc43d/reviews')
          .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
          .send(review)
          .end(function(err, res) {
            // console.log(res.error);
            expect(res.error.status, 400);
            // expect(res.error).to.include('User can not review their own courses.');
            done();
          });
    });

    it('it should create a new review ==>', function(done) {
      //create a new user object
      var review = {
        rating: 1
      };

      // chai.
      request('localhost:5000')
        .post('/api/courses/57029ed4795118be119cc443d/reviews')
        .set('Authorization', 'Basic c2FtQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .send(review)
        .end(function(err, res) {
          // res.should.have.status(201);
          expect(res.status, 201);
          done();
        });
    });

  });

});
