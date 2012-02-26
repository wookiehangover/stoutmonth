var
  _            = require('underscore'),
  config       = require('./config'),
  mongoose     = require('mongoose'),
  mongooseAuth = require('mongoose-auth'),
  Schema       = mongoose.Schema,
  ObjectId     = Schema.ObjectId,
  models       = {};


/* ------------------------------ Mongoose ------------------------------ */

mongoose.connect( config.mongo_url );

/* ------------------------------ Stout ------------------------------ */

function fieldExists( f ){
  return f ? f : '??';
}

function getAverage(){
  var
    sum     = this.raw_rating || 0,
    total   = this.ratings || 0,
    average = sum / total;

  return _.isNaN( average ) ? 0 : average.toFixed(2);
}

function ratingSum( rating ){
  if( rating === 0 ){
    return rating;
  }

  return this.raw_rating ? this.raw_rating + rating: rating;
}

function ratingTotal( r ){
  return this.ratings ? this.ratings + 1: r || 0;
}

function slugGenerator (options){
  options = options || {};
  var key = options.key || 'name';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return v;
    });
  };
}

function starRating(){
  var
    stars = [],
    full  = Math.floor( this.rating ),
    empty = 5 - full;

  while( full-- ){
    stars.push( '&#9733;' ); // full star
  }

  while( empty-- ){
    stars.push( '&#9734;' ); // empty star
  }

  return stars.join('');
}

models.stout = new Schema({
  name        : { type: String, index: true },
  slug        : { type: String, lowercase: true, trim: true },
  og          : { type: String, get: fieldExists },
  abv         : { type: String, get: fieldExists },
  malt        : String,
  hops        : String,
  description : String,
  raw_rating  : { type: Number, set: ratingSum, 'default': 0 },
  ratings     : { type: Number, set: ratingTotal, 'default': 0 }
});

models.stout.plugin( slugGenerator() );

models.stout.virtual('rating').get( getAverage );

models.stout.virtual('starRating').get( starRating );

/* ------------------------------ Drink ------------------------------ */

function currentTime(){
  return new Date();
}

function setTime( v ){
  return v == 'now' ? new Date() : v;
}

function incCount( count ){
  return this.count ? this.count + 1 : count || 0;
}


models.drink = new Schema({
  beer  : String,
  rated : Boolean,
  my_rating: Number,
  user  : { type: String, index: true },
  count : { type: Number, 'default': 0, set: incCount },
  date  : { type: Date, 'default': currentTime, set: setTime },
  _owner: { type: Schema.ObjectId, ref: 'User' }
});

models.drink.statics.getTotal = function( login, callback ){

  return this.find({ user: login }, function( err, docs ){

    if( err ){
      return callback( err, 0 );
    }

    var total = docs.reduce(function( mem, doc ){
      return mem + doc.count;
    }, 0);

     return callback( false, total );

  });

};

/* ------------------------------ User ------------------------------ */

models.user = new Schema();

var User;

models.user.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    },

    facebook: {
      everyauth: {
        myHostname: config.hostname,
        appId: config.fb.id,
        appSecret: config.fb.secret,
        redirectPath: '/stouts'
      }
    },

    github: {
      everyauth: {
        myHostname: config.hostname,
        appId: config.github.id,
        appSecret: config.github.secret,
        redirectPath: '/'
      }
    }

});

/* ------------------------------ Exports ------------------------------ */

mongoose.model( 'User', models.user );
User = mongoose.model( 'User' );
exports.user = mongoose.model( 'User' );

mongoose.model( 'Stout', models.stout );
exports.stout = mongoose.model( 'Stout' );

mongoose.model( 'Drink', models.drink );
exports.drink = mongoose.model( 'Drink' );

exports.mongooseAuth = mongooseAuth;
exports.mongoose = mongoose;
