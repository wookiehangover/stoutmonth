/*global _: true */

var
  _            = require('underscore'),
  express      = require('express'),
  ejs          = require('ejs'),
  routes       = require('./routes'),

  hogan        = require('hogan.js'),
  adapter      = require('./lib/hogan-express'),

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

everyauth.debug = true;


// Configuration

ejs.open  = "{{";
ejs.close = "}}";


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.register('mustache', adapter.init( hogan ) );
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


mongooseAuth.helpExpress( app );

// Routes

app.get('/', routes.index);

app.get('/admin', function( req, res ){
  app.use( express.basicAuth( 'admin', 'ch@nge,me' ) );
  res.render( 'index' );
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


app.get( '/stouts', routes.stouts.index );

app.get( '/stout/:id', routes.stouts.show );

app.get( '/admin/stout/new', function( req, res ){
  app.use( express.basicAuth( 'admin', 'ch@nge,me' ) );
  routes.stouts.create.apply( this, Array.prototype.slice.call( arguments ) );
});

app.get( '/admin/stout/edit', function( req, res ){
  app.use( express.basicAuth( 'admin', 'ch@nge,me' ) );
  routes.stouts.update.apply( this, Array.prototype.slice.call( arguments ) );
});

app.get( '/admin/stout/update', function( req, res ){
  app.use( express.basicAuth( 'admin', 'ch@nge,me' ) );
  routes.stouts.update.apply( this, Array.prototype.slice.call( arguments ) );
});



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

