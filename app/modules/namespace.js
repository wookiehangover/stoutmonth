this.Stout = this.Stout || {
  module: function() {
    // Internal module cache.
    var modules = {};

    // Create a new module reference scaffold or load an existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return ( modules[name] = { Views: {} } );
    };
  }(),

  // Keep active application instances namespaced under an app object.
  app: _.extend({}, Backbone.Events)
};

Backbone.Model.prototype.idAttribute = "_id";


// use localstorage for anonymous users
if( ( this.Stout.local = ! this.ea_loggedIn ) ){
  require('modules/localstorage');
} else {
  // make a dummy storage method
  this.Store = function(){ return {}; };
}

module.exports = this.Stout;
