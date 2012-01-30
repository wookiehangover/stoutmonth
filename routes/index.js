var
  stouts = require('./stouts');

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

exports.stouts = stouts;


