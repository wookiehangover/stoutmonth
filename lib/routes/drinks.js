var
  _ = require('underscore'),
  routes = {},
  models = require('../models'),
  Drink = models.drink,
  hasProp = Object.prototype.hasOwnProperty,
  map = Array.prototype.map;

routes.api = {};

routes.api.index = function( req, res ){

  if( !req.user ){
    return res.send({ error: "Forbidden" }, 403);
  }

  Drink.find({ user: req.user.get('login') }, function( err, docs ){

    if( err ){
      return res.send({ error: "Not found" }, 404);
    }

    res.send( docs );

  });

};

routes.api.create = function( req, res ){

  if( !req.user ){
    return res.send({ error: "Forbidden" }, 403);
  }

  var drink = new Drink( req.body );

  drink.save( function(err, doc){
    if( err ) throw err;

    res.send( doc );
  });
};

routes.api.update = function( req, res ){

  var
    conditions = { user: req.body.user, beer: req.body.beer };

  Drink.findOne( conditions, function( err, doc ){

    if( err ){
      return res.send({}, 500);
    }

    doc.count += 1;

    doc.save(function( err ){
      res.send( doc );
    });

  });

};

routes.api.total = function( req, res ){

  if( !req.user ){
    return res.send({ error: "Forbidden" }, 403);
  }

  Drink.getTotal( req.user.get('login'), function( err, total ){

    if( err ){
      return res.send({ error: "An error occured" }, 500);
    }

    res.send({ total: total });

  });

};

routes.api.leaderboard = function( req, res ){

  Drink.find().populate('_owner').run(function( err, docs ){

    var resp = {};

    docs.forEach(function( doc, index ){
      if( hasProp.call( resp, doc.user ) ){
        resp[doc.user].count += doc.count;
      } else if( doc.user  ){
        resp[doc.user] = { profile: doc._owner, count: doc.count };
      }
    });

    res.send( map.call( Object.keys( resp ), function( k ){
      return resp[k];
    }), 200 );

  });

};

module.exports = routes;

