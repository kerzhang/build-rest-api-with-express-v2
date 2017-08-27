'use strict';
var request = require('supertest');

describe('Review Test', function() {

  describe.skip('POST Review', function() {
    it('It should return error when user review their owner course ==>', function(
      done
    ) {
      //create a new review object
      var review = {
        rating: 1
      };

      request('localhost:5000')
        .post('/api/courses/57029ed4795118be119cc43d/reviews')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .send(review)
        .expect(400, done);
    });

    it('it should create a new review ==>', function(done) {
      //create a new review object
      var review = {
        rating: 1
      };

      request('localhost:5000')
        .post('/api/courses/57029ed4795118be119cc43d/reviews')
        .set('Authorization', 'Basic c2FtQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .send(review)
        .expect(201, done);
    });
  });
});
