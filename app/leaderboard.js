var nm = require('./modules/namespace');

var Leaderboard = Backbone.Collection.extend({

  url: '/api/drinks/leaderboard',

  initialize: function(){
    this.deferred = this.fetch();
  },

  comparator: function( doc ){
    return - doc.get('count');
  }

});

var LeaderboardView = Backbone.View.extend({

  initialize: function(){
    this.collection.bind('reset', function(){
      debugger;
      this.render();
    }, this);
  },

  render: function(){
    var contents = JST.leaderboard({ leaders: this.collection.toJSON() });
    this.$el.html( contents );
  }

});

nm.init = function($){

  nm.leaderboard = new Leaderboard();

  nm.leaderboardView = new LeaderboardView({
    el: $('#leaderboard'),
    collection: nm.leaderboard
  });

};

jQuery( nm.init );
