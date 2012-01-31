var
  nm      = require('modules/namespace'),
  cornify = require('modules/cornify'); // shh!

var User = Backbone.Model.extend({

  initialize: function(){
    this.deferred = this.fetch();
  },

  localStorage: new Store('user'),

  url: '/api/user'
});

var DrinkView = Backbone.View.extend({

  initialize: function(){

    this.setCount( this.model.get('count') );

    this.model.bind('change', function( model ){
      this.setCount( model.get('count') );
    }, this);

  },

  setCount: function( count ){
    var $this = this.$el.find('.counter');
    $this.text( count );
    this.$el.attr('class', 'd_'+ ( count > 9 ? 10 : count ) );
  }

});

var Drink = Backbone.Model.extend({

  initialize: function(){
    this.view = new DrinkView({ model: this, el: $('#'+ this.get('beer') ) });
  }

});

var Drinks = Backbone.Collection.extend({
  url: '/api/drinks',

  localStorage: new Store('drinks'),

  model: Drink,

  initialize: function(){
    this.fetch();
  },

  findByBeer: function( beer ){
    return this.find(function( model ){
      return beer === model.get('beer');
    });
  },

  drink: function( slug, user ){

    var beer = this.findByBeer( slug );

    if( beer ){

      if( beer.get('count') >= 13 ) cornify();

      return beer.save({
        count: beer.get('count') + 1
      });

    } else {

      beer = new Drink({
        beer: slug,
        user: user,
        count: 1
      });

      this.add(beer);

      return beer.save();
    }

  }

});


var StoutList = Backbone.View.extend({

  initialize: function( data ){
    if( data.user ){
      this.user = data.user;
    }

    if( data.drinks ){
      this.drinks = data.drinks;
    }

  },

  events: {
    "click .button": "onDrink"
  },

  onDrink: function( e ){
    e.preventDefault();

    var $this = $(e.currentTarget);

    this.drinks.drink( $this.data('slug'), this.user.get('login') );
  }

});


jQuery(function( $ ){

  nm.drinks = new Drinks();
  nm.user   = new User();

  nm.stoutList = new StoutList({
    el: $('#stout-list'),
    user: nm.user,
    drinks: nm.drinks
  });

});
