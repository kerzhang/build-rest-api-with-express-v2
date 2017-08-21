var auth = require('basic-auth');

var credentials = auth()

function loggedIn(req, res, next) {
  var credentials = auth(req);

  if (req.session && req.session.userId) {
    // if (req.session && req.session.userId) {
      return res.redirect('/');
    }
    return next();
  }

  function requiresSignIn(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
    }
  }
  module.exports.loggedOut = loggedOut;
  module.exports.requiresSignIn = requiresLogin;
  