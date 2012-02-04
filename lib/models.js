var
  _            = require('underscore'),
  mongoose     = require('mongoose'),
  mongooseAuth = require('mongoose-auth'),
  mongo_url    = process.env.MONGOLAB_URI || 'mongodb://localhost/testtest',
  Schema       = mongoose.Schema,
  ObjectId     = Schema.ObjectId,
  models       = {};

mongoose.connect( mongo_url );

/* ------------------------------ Stout ------------------------------ */

function ratingSum( rating ){
  if( rating === 0 ){
    return rating;
  }

  return this.raw_rating ? this.raw_rating + rating: rating;
}

function ratingTotal( ){
  return this.ratings ? this.ratings + 1: 0;
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

function fieldExists( f ){
  return f ? f : '??';
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

models.stout
.virtual('rating')
.get(function(){
  var
    sum   = this.raw_rating || 0,
    total = this.ratings || 0,
    average = sum / total;

  return _.isNaN( average ) ? 0 : average.toFixed(2);
});

models.stout
.virtual('starRating')
.get(function(){
  var
    stars = [],
    full = Math.floor( this.rating ),
    empty = 5 - full;

  while( full-- ){
    stars.push('&#9733;'); // full star
  }

  while( empty-- ){
    stars.push('&#9734;'); // empty star
  }

  return stars.join('');
});





/* ------------------------------ Drink ------------------------------ */

models.drink = new Schema({
  beer  : String,
  rated : Boolean,
  count : { type: Number, 'default': 1 },
  user  : { type: String, index: true },
  my_rating: Number,
  date  : Date
});

models.drink.path('date')
.default(function(){
   return new Date()
 })
.set(function(v){
   return v == 'now' ? new Date() : v;
 });

 models.drink.path('count')
.set(function(v){
   return v++;
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
        myHostname: process.env.FB_URL || 'http://batman.local:3000',
        appId: process.env.FB_ID,
        appSecret: process.env.FB_SECRET,
        redirectPath: '/stouts'
      }
    },

    github: {
      everyauth: {
        myHostname: process.env.FB_URL || 'http://batman.local:3000',
        appId: process.env.GH_ID,
        appSecret: process.env.GH_SECRET,
        redirectPath: '/'
      }
    }

});

mongoose.model( 'User', models.user );
User = mongoose.model( 'User' );
exports.user = mongoose.model( 'User' );

mongoose.model( 'Drink', models.drink );
exports.drink = mongoose.model( 'Drink' );

mongoose.model( 'Stout', models.stout );
exports.stout = mongoose.model( 'Stout' );

exports.mongooseAuth = mongooseAuth;
exports.mongoose = mongoose;

