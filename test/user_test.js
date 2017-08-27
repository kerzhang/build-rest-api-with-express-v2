var chai = require('chai');
var chaiHttp = require('chai-http');
// var server = require('../src/index');
var should = chai.should();
var expect = chai.expect;

var User = require('../src/models/user.js');

chai.use(chaiHttp);

describe('User Test', function() {

  // before(function(done) {
  //   User.remove({}, function(err) {
  //     if (err) console.log(err);
  //     done();      
  //   });
  // });

  describe('/POST user function: ', function() {
    it('it should create a new user ==>', function(done) {
      //create a new user object
      var user = {
        emailAddress: 'ker@cooboor.com',
        fullName: 'Lady Gaga',
        password: 'password'
      };

      chai.request('localhost:5000')
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

      chai.request('localhost:5000')
      // .request(server)
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

      chai.request('localhost:5000')
      
        // .request(server)
        .post('/api/users')
        .send(user)
        .end(function(err, res) {
          expect(res.error.text).to.include('eMail already exist');
          done();
        });
    });
  });

  describe(' Get user ==>', function() {
    it('it should return error to user without authorization', function(done) {
      chai.request('localhost:5000')
      .get('/api/users')
      .end(function(err, res) {
        res.should.have.property('error');
        res.should.have.status(401);
        done();
      });
    });

    it('it should return the Authorized user', function(done) {
      
      chai.request('localhost:5000')
      .get('/api/users')
        .set('Authorization', 'Basic a2VyQGNvb2Jvb3IuY29tOnBhc3N3b3Jk')
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
