var
  _            = require('underscore'),
  hbs          = require('hbs'),
  express      = require('express'),
  everyauth    = require('everyauth'),
  RedisStore   = require('connect-redis')(express),

  routes       = require('./lib/routes'),
  models       = require('./lib/models'),

  mongooseAuth = models.mongooseAuth;

var redis_options = {},
    client_options = [],
    redis_url;

if( process.env.REDISTOGO_URL ){
  redis_url = require('url').parse(process.env.REDISTOGO_URL);

  redis_options = {
      host: redis_url.hostname
    , port: redis_url.port
    , db:   redis_url.auth.split(':')[0]
    , pass: redis_url.auth.split(':')[1]
  };

  client_options = [redis_options.port, redis_options.host];
}

var app = express.createServer(
  express.bodyParser(),
  express.static(__dirname + '/assets'),
  express.methodOverride(),
  express.cookieParser(),
  express.session({ secret: 'stouts are delicious', store: new RedisStore( redis_options ), maxAge: 900001 }),
  mongooseAuth.middleware()
);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
});

app.configure('development', function(){
  everyauth.debug = true;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.helpers({ production: true });
});


mongooseAuth.helpExpress( app );

// Routes

app.get( '/', routes.index );

app.get( '/admin', express.basicAuth( 'admin', 'ch@nge,me' ), routes.admin );

app.get('/leaderboard', routes.leaderboard );

// User

app.get('/logout', routes.logout );

app.get( '/me', routes.user.index );

app.get( '/api/user', routes.user.api.show );

app.put( '/api/user', routes.user.api.update );

//app.get( '/api/users', routes.user.api.index );

app.get( '/api/user/:id', routes.user.api.show );


// Drinks

app.get( '/api/drinks', routes.drinks.api.index );

app.post('/api/drinks', routes.drinks.api.create );

app.put( '/api/drinks/:id', routes.drinks.api.update );

app.get( '/api/drinks/total', routes.drinks.api.total );

app.get( '/api/drinks/leaderboard', routes.drinks.api.leaderboard );

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

