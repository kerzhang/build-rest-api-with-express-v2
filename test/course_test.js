var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');
var should = chai.should();

var Course = require('../src/models/course.js');

chai.use(chaiHttp);

describe('Course Test', function() {
  before(function(done) {
    Course.remove({}, function(err) {
      if (err) console.log('Error returned while initialization: ' + err);
    });
    done();
  });

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

      chai
        .request(server)
        .post('/api/courses')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .send(course)
        .end(function(err, res) {
          res.should.have.status(201);
          res.header.should.have.property('location');
          done();
        });
    });

    it('it should return all existing courses ==>', function(done) {
      chai
        .request(server)
        .get('/api/courses')
        .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          var courses = res.body;
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
          courses[0].should.have.property('_id');
          courses[0].should.have.property('title');
          done();
        });
    });
  });
});
