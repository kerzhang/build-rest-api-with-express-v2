var request = require('supertest');

describe.skip('Course Test', function() {
  describe('/POST course function: ', function() {
    it('it should POST a new course ==>', function(done) {
      //create a new course object
      var course = {
        title: 'New Course',
        description: 'My course description',
        user: {
          _id: '57029ed4795118be119cc437'
        },
        steps: [
          {
            title: 'Step 1',
            description: 'My first step.'
          }
        ]
      };

      request('localhost:5000')
        .post('/api/courses')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .send(course)
        .expect(201, done);
      // .expect('location', '/', done);
    });
  });

  describe('GET /api/courses', function() {
    it('It should return all existing courses ==>', function(done) {
      request('localhost:5000').get('/api/courses').expect(200, done);
    });
  });

  describe('Get /api/courses/:courseId', function() {
    it('It should return a course ==>', function(done) {
      request('localhost:5000')
        .get('/api/courses/57029ed4795118be119cc43d')
        .expect(200, done);
    });

    it('It should return a 201 when update a course ==>', function(done) {
      var newCourse = {
        title: 'New Course Updated Again Hello',
        description: 'My course description. And again.',
        user: {
          _id: '57029ed4795118be119cc437'
        },
        steps: [
          {
            title: 'Step 1',
            description: 'My first step.'
          }
        ]
      };
      request('localhost:5000')
        .put('/api/courses/57029ed4795118be119cc43d')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA')
        .send(newCourse)
        .expect(201, done);
    });
  });

  describe.skip('Delete /api/courses/:courseId', function() {
    it('It should delete a course ==>', function(done) {
      request('localhost:5000')
        .get('/api/courses/57029ed4795118be119cc440')
        .expect(200, done);
      });
    });
  });
