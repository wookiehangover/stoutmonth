var
  _            = require('underscore'),
  mongoose     = require('mongoose'),
  mongooseAuth = require('mongoose-auth'),
  mongo_url    = process.env.MONGOHQ_URL || 'mongodb://localhost/stoutmonth',
  Schema       = mongoose.Schema,
  ObjectId     = Schema.ObjectID,
  models       = {};

mongoose.connect( mongo_url );

function addRating( rating ){
  return this.raw_rating ? this.raw_rating + rating: rating;
}

models.stout = new Schema({
  name: String,
  abv: String,
  raw_rating: { type: Number, set: addRating }
});


models.user = new Schema({});

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

