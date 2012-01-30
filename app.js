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

app.get('/', routes.index );

app.get('/logout', routes.logout );

app.get( '/stouts', routes.stouts.index );

app.get( '/stout/:slug', routes.stouts.show );

app.get( '/api/stouts', routes.stouts.api.index );

app.get( '/api/stout/:slug', routes.stouts.api.show );

app.get( '/admin', express.basicAuth( 'admin', 'ch@nge,me' ), routes.admin );

app.get( '/stout/new', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts['new'] );

app.post( '/stout/new', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts.create );

app.get( '/stout/:slug/update', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts.edit );

app.post( '/stout/:slug/update', express.basicAuth( 'admin', 'ch@nge,me' ), routes.stouts.update );

// App Init

app.listen(3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

