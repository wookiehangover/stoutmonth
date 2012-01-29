var
  stouts = require('./stouts');

exports.index = function(req, res){
  res.render('index');
};

exports.stouts = stouts;


