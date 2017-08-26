var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');
var should = chai.should();
var expect = chai.expect;

var Review = require('../src/models/review.js');

chai.use(chaiHttp);

describe('Review Test', function() {

  before(function(done) {
    Review.remove({}, function(err) {
      if(err) console.log(err);
    });
    done();
  });

  describe('/POST review function: ', function() {
    it('it should create a new review ==>', function(done) {
      //create a new user object
      var review = {
        rating: 1
      };

      chai
        .request(server)
        .post('/api/courses/57029ed4795118be119cc43d/reviews')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .send(review)
        .end(function(err, res) {
          // res.should.have.status(201);
          expect(res.status, 201);
          done();
        });
    });
  });

});
