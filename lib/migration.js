var
  models = require('./models'),
  User   = models.user,
  Drink  = models.drink,
  hasProp = Object.prototype.hasOwnProperty;


// add User ref to drinks
var users = {};
Drink.where('user').run(function( err, docs ){

  docs.forEach(function( doc, index ){

    console.log(doc);

    User.findOne({ 'login': doc.user }, function( err, user ){
      if( ! user ) return;

      console.log(user._id);

      doc._owner = user._id;

      doc.save(function( err, doc ){
        if( err ) throw err;
      });

    });

  });

});
