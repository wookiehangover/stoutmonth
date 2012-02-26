var
  nm      = require('./modules/namespace'),
  User    = require('./modules/user').Model,
  Drinks  = require('./modules/drink').Collection;


var StoutList = exports.StoutList = Backbone.View.extend({

  initialize: function( data ){
    if( data.user ){
      this.user = data.user;
    }

    if( data.drinks ){
      this.drinks = data.drinks;
    }

  },

  events: {
    "click .button": "drink"
  },

  drink: function( e ){
    this.drinks.drink( $(e.currentTarget).data(), this.user.get('login') );

    return false;
  }

});

nm.init = function( $ ){

  nm.drinks = new Drinks();
  nm.user   = new User();

  nm.stoutList = new StoutList({
    el: $('#stout-list'),
    user: nm.user,
    drinks: nm.drinks
  });

  $('#stout-search').quicksearch( $('#stout-list li') );

};

jQuery( nm.init );
