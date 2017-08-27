var auth = require('basic-auth');
var User = require('../models/user');

function requiresSignIn(req, res, next) {
  var credentials = auth(req);
  console.log(credentials);
  if (credentials) {
    User.authenticate(credentials.name, credentials.pass, function(
      error,
      user
    ) {
      if (error) {
        return next(error);
      } else {
        res.locals.currentUser = user;
        return next();
      }
    });
  } else {
    var err = new Error('Please sign in first!');
    err.status = 401;
    return next(err);
  }
}
module.exports.requiresSignIn = requiresSignIn;
