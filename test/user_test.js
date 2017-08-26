var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');
var should = chai.should();
var expect = chai.expect;

var User = require('../src/models/user.js');

chai.use(chaiHttp);

describe('User Test', function() {

  before(function(done) {
    User.remove({}, function(err) {
      if (err) console.log(err);
    });
    done();
  });

  describe('/POST user function: ', function() {
    it('it should create a new user ==>', function(done) {
      //create a new user object
      var user = {
        emailAddress: 'ker@cooboor.com',
        fullName: 'John Smith',
        password: 'password'
      };

      chai
        .request(server)
        .post('/api/users')
        .send(user)
        .end(function(err, res) {
          res.should.have.status(201);
          // res.header.should.have.property('location').eql('/');
          expect('Location', '/');
          done();
        });
    });

    it('it should return error when creating user without required field ==>', function(done) {
      //create a new user object
      var user = {
        fullName: 'John Smith',
        password: 'password'
      };

      chai
        .request(server)
        .post('/api/users')
        .send(user)
        .end(function(err, res) {
          expect(res.error.text).to.include('All fields required.');
          done();
        });
    });

    it('it should return error when a new user come with existing email ==>', function(done) {
      //create a new user object
      var user = {
        emailAddress: 'ker@cooboor.com',
        fullName: 'John Smith',
        password: 'password'
      };

      chai
        .request(server)
        .post('/api/users')
        .send(user)
        .end(function(err, res) {
          expect(res.error.text).to.include('E11000 duplicate key error');
          done();
        });
    });
  });

  describe(' Get user ==>', function() {
    it('it should return error to user without authorization', function(done) {
      chai.request(server).get('/api/users').end(function(err, res) {
        res.should.have.property('error');
        res.should.have.status(401);
        done();
      });
    });

    it('it should return the Authorized user', function(done) {
      chai
        .request(server)
        .get('/api/users')
        .auth('ker@cooboor.com', 'password')
        .end(function(err, res) {

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('emailAddress');
          res.body.should.have.property('fullName');
          done();
        });
    });
  });
});
