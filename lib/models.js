var
  _            = require('underscore'),
  mongoose     = require('mongoose'),
  mongooseAuth = require('mongoose-auth'),
  mongo_url    = process.env.MONGOHQ_URL || 'mongodb://localhost/stoutmonth',
  Schema       = mongoose.Schema,
  ObjectId     = Schema.ObjectID,
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
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
}

models.stout.plugin( slugGenerator() );

/* ------------------------------ User ------------------------------ */

function incCount( c ){
  return this.count ? this.count + c: c;
}

models.drinks = new Schema({
  name  : { type: String, index: true },
  count : { type: Number, set: incCount, 'default': 0 }
});

models.user = new Schema({
  drinks: [ models.drinks ]
});

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
          myHostname: 'http://localhost:3000'
        , appId: '245138688895363'
        , appSecret: '0d086fd75c98efed26092ac4712f9615'
        , redirectPath: '/stouts'
      }
    }
});


mongoose.model( 'User', models.user );
User = mongoose.model( 'User' );
exports.user = mongoose.model( 'User' );

mongoose.model( 'Stout', models.stout );
exports.stout = mongoose.model( 'Stout' );

exports.mongooseAuth = mongooseAuth;
exports.mongoose = mongoose;

