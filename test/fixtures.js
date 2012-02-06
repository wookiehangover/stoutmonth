var _ = require('underscore')._;

exports.stout = {
  "name" : "Meat Packer Stout",
  "abv" : "16.8%",
  "og" : "",
  "description" : "Mephistopheles is the crafty shape shifter, the second fallen angel. Amazingly complex, coal black, velvety and liqueurish, this demon has a bouquet of vine-ripened grapes, anise and chocolate covered cherries with flavors of rum-soaked caramelized dark fruits and a double espresso finish. Mephistopheles is the final installment of \"The Demons of Ale\" series. ",
  "malt" : "Mallllts",
  "hops" : "Hoooops",
  "ratings" : 1,
  "raw_rating" : 4
};

exports.user = {
  "login" : "old_dude",
  "fb" : {
    "id" : "foobar",
    "accessToken" : "foobar",
    "alias" : "samuelbreed",
    "gender" : "male",
    "timezone" : "-7",
    "locale" : "en_US",
    "verified" : true,
    "updatedTime" : "2011-12-08T02:57:59+0000",
    "name" : {
      "full" : "Samuel Breed",
      "first" : "Samuel",
      "last" : "Breed"
    }
  }
};

exports.factory = {};

exports.factory.stout = function( s ){
  return _.defaults( s || {}, exports.stout );
};

exports.factory.drink = function( d ){
  return _.defaults( d || {}, {
    "beer" : "girl-scout-stout",
    "user" : "old_dude"
  });
};
