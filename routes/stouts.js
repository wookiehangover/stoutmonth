var
  _      = require('underscore'),
  routes = {},
  models = require('../lib/models'),
  Stout  = models.stout;

/* ------------------------------ Resources ------------------------------ */

routes.index = function( req, res ){
  Stout.find({}, [], { sort: { 'name': 1 } }, function( err, docs ){
    if( err ) throw err;

    return res.render('stout/index', {
      stouts: docs
    });
  });
};

routes.show = function( req, res ){
  Stout.find({ 'slug': req.params.slug }, function( err, doc ){
    if( err ) throw err;

    res.render( 'stout/show', {
      stout: doc
    });
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
  Stout.find({ 'slug': req.params.slug }, function( err, doc ){
    if( err ) throw err;

    res.render( 'stout/edit', { stout: doc } );
  });
};

routes.update = function( req, res ){
  var
    conditions = { 'slug': req.params.slug },
    update     = req.body.stout;

  Stout.update( conditions, update, {}, function( err, doc, next ){
    if( err ){
      return next(new Error('Could not load Document'));
    }

    res.redirect('/stout/' + req.params.slug );
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
    if( err ) throw err;

    return res.send( docs );
  });
};

routes.api.show = function( req, res ){
  Stout.find({ "slug": req.params.slug }, function( err, doc ){
    if( err ) throw err;

    res.send( doc );
  });
};

module.exports = routes;
