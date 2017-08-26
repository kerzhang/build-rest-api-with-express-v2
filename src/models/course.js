var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var CourseSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Course title is required.']
  },
  description: {
    type: String,
    required: [true, 'Course description is required.']
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded: {
    type: String
  },
  steps: [
    {
      stepNumber: {
        type: Number
      },
      title: {
        type: String,
        required: [true, 'Course step title is required.']
      },
      description: {
        type: String,
        required: [true, 'Course step description is required.']
      }
    }
  ],
  reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
  ]
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
