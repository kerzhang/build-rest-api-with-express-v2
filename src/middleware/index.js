var auth = require('basic-auth');

  function requiresSignIn(req, res, next) {
    var credentials = auth.parse(req.get('Authorization'));
    
    if (credentials) {
      return next();
    } else {
      var err = new Error('Please sign in first!');
      err.status = 401;
      return next(err);
    }
  }
  // module.exports.loggedOut = loggedOut;
  module.exports.requiresSignIn = requiresSignIn;
  