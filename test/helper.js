var _ = require('underscore')._;

exports.request = function( o ){
  return _.defaults( o || {}, {

    body: {},

    params: {},

    user: {

      get: function(){
        return 'old_dude';
      }

    }

  });
};

exports.response = function( cb ){
  return {

    render: function( path, context ){
      return cb.apply( this, arguments );
    },

    send: function( res, code ){
      return cb.apply( this, arguments );
    },

    redirect: function( path ){
      return cb.apply( this, arguments );
    }

  };
};
