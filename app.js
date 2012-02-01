/*global _: true */

var
  _            = require('underscore'),
  express      = require('express'),
  routes       = require('./routes'),

  hogan        = require('hogan.js'),
  hoganAdapter = require('./lib/hogan-express'),

  everyauth    = require('everyauth'),
  models       = require('./lib/models'),
  mongooseAuth = models.mongooseAuth;


var app = express.createServer(
  express.bodyParser(),
  express['static'](__dirname + '/assets'),
  express.methodOverride(),
  express.cookieParser(),
  express.session({ secret: 'stouts are delicious'}),

  mongooseAuth.middleware()
);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.register('mustache', hoganAdapter.init( hogan ) );
});

app.configure('development', function(){
  everyauth.debug = true;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

mongooseAuth.helpExpress( app );

// Routes

app.get( '/', routes.index );

app.get( '/admin', express.basicAuth( 'admin', 'ch@nge,me' ), routes.admin );

// User

app.get('/logout', routes.logout );

app.get( '/me', routes.user.index );

app.get( '/api/user', routes.user.api.index );

app.put( '/api/user', routes.user.api.update );

// Drinks

app.get( '/api/drinks', routes.drinks.api.index );

app.post('/api/drinks', routes.drinks.api.create );

app.put( '/api/drinks/:id', routes.drinks.api.update );

app.get( '/api/drinks/total', routes.drinks.api.total );

// Stouts

app.get( '/stouts', routes.stouts.index );

app.get( '/stout/new', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts['new'] );

app.post( '/stout/new', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts.create );

app.get( '/stout/:slug/update', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts.edit );

app.post( '/stout/:slug/update', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts.update );

app.post( '/stout/:slug/rate', routes.stouts.rate );

app.get( '/stout/:slug', routes.stouts.show );

app.get( '/api/stouts', routes.stouts.api.index );

app.get( '/api/stout/:slug', routes.stouts.api.show );

// General

app.get( '*', function( req, res ){
  res.render('404');
});

app.error(function(err, req, res, next){
  res.render('404');
});

// App Init

app.listen( process.env.PORT || 3000 );

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

