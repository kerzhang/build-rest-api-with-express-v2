var request = require('supertest');


  describe('/POST user /api/users ==> ', function() {
    it('it should create a new user ==>', function(done) {
      var newuserid = Math.ceil(Math.random()*10000);
      //create a new user object
      var user = {
        emailAddress: newuserid + '@cooboor.com',
        fullName: 'Super Man',
        password: 'password'
      };

      request('localhost:5000')
        .post('/api/users')
        .send(user)
        .expect(201, done);
        // .expect('Location', '/');

    });

    it('it should return error when creating user without required field ==>', function(
      done
    ) {
      //create a new user object
      var user = { fullName: 'John Smith', password: 'password' };

      request('localhost:5000')
        .post('/api/users')
        .send(user)
        .expect(function (error, res) {
          assert(error.indexOf('validation failed') > 0 , true);
        });
        done();
    });

    it('it should return error when a new user come with existing email ==>', function(
      done
    ) {
      //create a new user object
      var user = {
        emailAddress: 'joe@smith.com',
        fullName: 'John Smith',
        password: 'password'
      };

      request('localhost:5000')
        .post('/api/users')
        .send(user)
        .expect( function (error, res) {
          assert(error.message,'eMail already exist.');
        });
        done();
    });
  });

  describe.only('Get user: /api/users ==>', function() {
    
    it('it should return error to user without authorization', function(done) {
      request('localhost:5000').get('/api/users').expect(401, done);
    });

    it('it should return the Authorized user', function(done) {
      request('localhost:5000')
        .get('/api/users')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .expect(200,done);
    });
  });
