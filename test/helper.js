exports.request = function(){
  return {

    body: {},

    params: {},

    user: {

      get: function(){
        return 'old-dude';
      }

    }

  };
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
