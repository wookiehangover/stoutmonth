var
  nm = require('./namespace'),
  cornify = require('./cornify'); // shh!

/* ------------------------------ View ------------------------------ */

var DrinkView = exports.View = Backbone.View.extend({

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

/* ------------------------------ Model ------------------------------ */

var Drink = exports.Model = Backbone.Model.extend({

  initialize: function(){
    this.view = new DrinkView({ model: this, el: $('#'+ this.get('beer') ) });
  }

});

/* ------------------------------ Collection ------------------------------ */

var Drinks = exports.Collection = Backbone.Collection.extend({
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

  drink: function( data, user ){

    var beer = this.findByBeer( data.slug );

    if( ! confirm( data.name + '\nAre you sure you drank that?') ){
      return;
    }

    if( beer ){

      if( beer.get('count') >= 13 ) cornify();

      return beer.save({
        count: beer.get('count') + 1
      });

    } else {

      beer = new Drink({
        beer: data.slug,
        user: user,
        count: 1
      });

      this.add(beer);

      return beer.save();
    }

  }

});

