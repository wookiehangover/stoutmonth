var
  drinks = require('./drinks'),
  stouts = require('./stouts'),
  user   = require('./user');

exports.drinks = drinks;

exports.stouts = stouts;

exports.user = user;

exports.index = function(req, res){
  res.render('index');
};

exports.admin = function( req, res ){
  res.render( 'admin' );
};

exports.logout = function( req, res ){
  req.logout();
  res.redirect('/');
};
