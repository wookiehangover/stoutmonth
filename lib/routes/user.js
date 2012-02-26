var
  _ = require('underscore'),
  routes = {},
  models = require('../models'),
  User  = models.user,
  Drink = models.drink;

routes.index = function( req, res, next ){

  if( !req.user ){
    return next(new Error('Not Found'));
  }

  Drink.getTotal( req.user.get('login'), function( err, total ){

    if( err ){
      return next( new Error( err ) );
    }

    res.render('user/index', {
      total: total,
      user: JSON.stringify( req.user, '', '  ' )
    });
  });

};

routes.api = {};

routes.api.index = function( req, res ){

  if( !req.user ) return res.send({ error: 'Forbidden' }, 403 );

  User.find({}, function( err, doc ){
    if( err ) return res.send({ error: "Not found" }, 404);

    res.send( doc, 200 );
  });


};

routes.api.show = function( req, res ){

  if( req.params.id ){
    return User.findById(req.params.id, function(err, doc, next){
      if( err ) return res.send({ error: "Not found" }, 404);

      res.send( doc, 200 );
    });
  }

  if( !req.user ){
    return res.send({ error: "Not found" }, 404);
  }

  res.send( req.user, 200 );

};

routes.api.update = function( req, res, next ){

  if( !req.user ){
    return res.send({ error: "Not found" }, 404);
  }

  var conditions = { login: req.user.login };

  User.update( conditions, req.body, {}, function( err, doc, next ){
    if( err ) return res.send(new Error('Could not load Document'));

    res.send( '', 202 );
  });

};

routes.api.destroy = function( req, res ){

  if( !req.user ){
    return res.send( { error: "Forbidden" }, 403 );
  }

  var conditions = { login: req.user.get('login') };

  req.logout();

  User.remove( conditions, function( err, doc ){
    if( err ){
      return res.send(new Error('Could not load Document'));
    }

    res.redirect('/');
  });

};

module.exports = routes;
