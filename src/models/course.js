var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema =  mongoose.Schema;

var CourseSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
  reviews: [
    {
      stepNumber: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
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
