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

// authenticate input against database documents
// UserSchema.statics.authenticate = function(email, password, callback) {
//   User.findOne({ emailAddress: email })
//       .exec(function (error, user) {
//         if (error) {
//           return callback(error);
//         } else if ( !user ) {
//           var err = new Error('User not found.');
//           err.status = 401;
//           return callback(err);
//         }
//         bcrypt.compare(password, user.password , function(error, result) {
//           if (result === true) {
//             return callback(null, user);
//           } else {
//             return callback();
//           }
//         })
//       });
// }
// // hash password before saving to database
// UserSchema.pre('save', function(next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function(err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });
var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
