var nm = require('./namespace');

var User = exports.Model = Backbone.Model.extend({

  initialize: function(){
    this.deferred = this.fetch();
  },

  localStorage: new Store('user'),

  url: '/api/user'
});
