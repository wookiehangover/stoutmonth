var
  routes = {},
  models = require('../lib/models'),
  Stout  = models.stout,
  Drink  = models.drink;

/* ------------------------------ Resources ------------------------------ */

routes.index = function( req, res ){
  Stout.find({}, [], { sort: { 'name': 1 } }, function( err, docs ){
    if( err ) throw err;

    return res.render('stout/index', {
      stouts: docs,
      search: true,
      js_module: 'stouts',
      loggedIn: req.loggedIn
    });
  });
};

routes.show = function( req, res ){

  Stout.findOne( { slug: req.params.slug }, function( err, doc ){
    if( err ) throw err;

    var conditions = { beer: req.params.slug };

    if( ! req.user ){

      res.render( 'stout/show', {
        stout: doc,
        js_module: 'stout_detail'
      });

    } else {

      conditions.user = req.user.get('login');

      Drink.findOne( conditions, function( error, drink ){
        if( error ) throw error;

        res.render( 'stout/show', {
          stout: doc,
          js_module: 'stout_detail',
          drink: drink
        });

      });
    }

  });
};

/* ------------------------------ CRUD ------------------------------ */

routes['new'] = function( req, res ){
  res.render('stout/new');
};

routes.create = function( req, res ){
  var stout = new Stout( req.body.stout );

  stout.save( function(err, doc){
    if( err ) throw err;

    res.redirect('/stout/' + doc.slug );
  });
};

routes.edit = function( req, res ){
  Stout.find({ slug: req.params.slug }, function( err, doc ){
    if( err ) throw err;

    res.render( 'stout/edit', { stout: doc } );
  });
};

routes.update = function( req, res, next ){
  var
    conditions = { slug: req.params.slug },
    update     = req.body.stout;

  Stout.update( conditions, update, {}, function( err, doc ){
    if( err ){
      return next(new Error('Could not load Document'));
    }

    res.redirect('/stout/' + req.body.stout.slug );
  });

};

routes.destroy = function( req, res ){
  // TODO
  res.render('stout/show');
};

/* ------------------------------ API ------------------------------ */

routes.api = {};

routes.api.index = function( req, res ){
  Stout.find({}, [], { sort: { 'name': 1 } }, function( err, docs ){
    if( err ){
      return res.send({ error: "Not found" }, 404);
    }

    return res.send( docs );
  });
};

routes.api.show = function( req, res ){
  Stout.findOne({ slug: req.params.slug }, function( err, doc ){
    if( err ){
      return res.send({ error: "Not found" }, 404);
    }

    res.send( doc );
  });
};

/* ------------------------------ RPC ------------------------------ */

// POST /stout/:slug/rate
routes.rate = function( req, res , next ){

  if( !req.user ){
    return res.send({ error: "Forbidden" }, 403);
  }

  Stout.findOne({ slug: req.params.slug }, function( error, beer ){

    if( error ){
      return res.send({ error: "Not found" }, 404);
    }

    Drink.findOne({ user: req.user.get('login') }, function( err, d ){


      if( error ){
        return res.send({ error: "Not found" }, 404);
      }

      beer.ratings = 1;
      beer.raw_rating = req.body.rating;
      d.rated = true;
      d.my_rating = req.body.rating;


      beer.save(function( err, doc ){
        d.save(function( err, dd ){
          res.send( { rating: doc.rating, starRating: doc.starRating }, 202 );
        });
      });

    });

  });

};

module.exports = routes;
