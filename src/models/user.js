var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    emailAddress: {
      type: String,
      unique: [true, 'This email is already registered.'],
      required: [true, 'Email address is require.'],
      trim: true
    },
    fullName: {
      type: String,
      required: [true, 'User name is required.'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
});


// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ emailAddress: email })
      .exec(function (error, user) {
        console.log(email);
        console.log(user);
        if (error) {
          return callback(error);
        } else if (!user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        });
      });

      // User.findOne({ emailAddress: email }, function(error, user){
      //   console.log(email);
      //   console.log(user);
      //   if (error) {
      //     return callback(error);
      //   } else if (!user ) {
      //     var err = new Error('User not found.');
      //     err.status = 401;
      //     return callback(err);
      //   }
      //   bcrypt.compare(password, user.password , function(error, result) {
      //     if (result === true) {
      //       return callback(null, user);
      //     } else {
      //       return callback();
      //     }
      //   });
      // });

};

// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
