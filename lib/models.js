var
  _            = require('underscore'),
  mongoose     = require('mongoose'),
  mongooseAuth = require('mongoose-auth'),
  mongo_url    = process.env.MONGOHQ_URL || 'mongodb://localhost/stoutmonth',
  Schema       = mongoose.Schema,
  ObjectId     = Schema.ObjectId,
  models       = {};

mongoose.connect( mongo_url );

/* ------------------------------ Stout ------------------------------ */

function addRawRating( rating ){
  return this.raw_rating ? this.raw_rating + rating: rating;
}

function addRating( r ){
  return this.ratings ? this.ratings + r: r;
}

models.stout = new Schema({
  name        : { type: String, index: true },
  slug        : { type: String, lowercase: true, trim: true },
  og          : String,
  abv         : String,
  malt        : String,
  hops        : String,
  description : String,
  raw_rating  : { type: Number, set: addRawRating },
  ratings     : { type: Number, set: addRating }
});

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

models.stout.plugin( slugGenerator() );

/* ------------------------------ Drink ------------------------------ */

models.drink = new Schema({
  beer  : String,
  count : { type: Number, 'default': 1 },
  user  : { type: String, index: true },
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
        myHostname: 'http://batman.local:3000',
        appId: '245138688895363',
        appSecret: '0d086fd75c98efed26092ac4712f9615',
        redirectPath: '/stouts'
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

