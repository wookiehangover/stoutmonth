var _ = require('underscore');

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

exports.factory = {};

exports.factory.drink = function( d ){

  return _.defaults( ( d || {} ), {
    "beer" : "girl-scout-stout",
    "user" : "old_dude"
  });

};
