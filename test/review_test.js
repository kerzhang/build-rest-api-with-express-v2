var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');
var should = chai.should();

var Review = require('../src/models/review.js');

chai.use(chaiHttp);

describe('Review Test', function() {

  before(function(done) {
    Review.remove({}, function(err) {
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
        .send(review)
        .end(function(err, res) {
          res.should.have.status(201);
          res.header.should.have.property('location').eql('/api/courses/57029ed4795118be119cc43d');
          done();
        });
    });
  });

});
